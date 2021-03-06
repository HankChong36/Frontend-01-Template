const net = require("net");

class Request {
  constructor(options) {
    this.method = options.method || "GET";
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || "/";
    this.headers = options.headers || {};
    this.body = options.body || {};
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body);
    } else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
      this.bodyText = Object.entries(this.body)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join(",");
    }
    this.headers["Content-Length"] = this.bodyText.length;
  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r\n${Object.entries(this.headers)
      .map(([key, value]) => `${key}: ${value}`)
      .join(",")}\r\n\r\n${this.bodyText}`;
  }

  send(connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser();
      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection(
          {
            host: this.host,
            port: this.port
          },
          () => {
            console.log("connected to server");
            connection.write(this.toString());
          }
        );

        connection.on("data", data => {
          parser.receive(data.toString());
          if (parser.isFinished) {
            resolve(parser.response);
          }
          connection.end();
        });

        connection.on("error", err => {
          reject(err);
          connection.end();
        });
      }
    });
  }
}

class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_VALUE = 3;
    this.WAITING_HEADER_SPACE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyPraser = null;
  }

  get isFinished() {
    return this.bodyPraser && this.bodyPraser.isFinished;
  }

  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyPraser ? this.bodyPraser.content.join("") : ""
    };
  }

  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }

  receiveChar(char) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === "\r") {
        this.current = this.WAITING_STATUS_LINE_END;
      } else {
        this.statusLine += char;
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === ":") {
        this.current = this.WAITING_HEADER_SPACE;
      } else if (char === "\r") {
        this.current = this.WAITING_HEADER_BLOCK_END;
        if (this.headers["Transfer-Encoding"] === "chunked") {
          this.bodyPraser = new TrunkedBodyParser();
        }
      } else {
        this.headerName += char;
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === " ") {
        this.current = this.WAITING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === "\r") {
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = "";
        this.headerValue = "";
      } else {
        this.headerValue += char;
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (char === "\n") {
        this.current = this.WAITING_BODY;
      }
    } else if (this.current === this.WAITING_BODY) {
      this.bodyPraser.receiveChar(char);
    }
  }
}

class TrunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WAITING_NEW_LINE = 3;
    this.WAITING_NEW_LINE_END = 4;
    this.length = "";
    this.content = [];
    this.isFinished = false;

    this.current = this.WAITING_LENGTH;
  }

  receiveChar(char) {
    if (this.current === this.WAITING_LENGTH) {
      if (char === "\r") {
        this.length = Number("0x" + this.length);
        if (this.length === 0) {
          this.isFinished = true;
          this.length = "";
        }
        this.current = this.WAITING_LENGTH_LINE_END;
      } else {
        this.length += char;
      }
    } else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (char === "\n") {
        this.current = this.READING_TRUNK;
      }
    } else if (this.current === this.READING_TRUNK) {
      this.content.push(char);
      this.length--;
      if (this.length === 0) {
        this.current = this.WAITING_NEW_LINE;
        this.length = "";
      }
    } else if (this.current === this.WAITING_NEW_LINE) {
      if (char === "\r") {
        this.current = this.WAITING_NEW_LINE_END;
      }
    } else if (this.current === this.WAITING_NEW_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITING_LENGTH;
      }
    }
  }
}

void (async function client() {
  let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: 8088,
    headers: {
      ["x-hello"]: "hello world"
    },
    body: {
      name:"HankChong"
    }
  });
  let response = await request.send();
  console.log(response);
})();
