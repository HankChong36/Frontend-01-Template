<script>
import BinaryHeap from "./binary-heap";
import Layout from "./layout";
export default {
  name: "PathDemo",
  components: {
    Layout
  },
  data() {
    return {
      width: 100,
      height: 100,
      vctxWidth: 1500,
      vctxHeight: 1500,
      rect: 15,
      map: null,
      vctx: null,

      fillColor: "#EE3f4d",
      pathColor: "#57c3c2",

      startPoint: { x: 0, y: 0 },
      endPoint: { x: 50, y: 50 }
    };
  },

  mounted() {
    this._initCanvas();
  },

  methods: {
    _initCanvas() {
      this.map = Array(this.width * this.height).fill(-1);
      let view = document.querySelector("canvas");
      view.width = this.vctxWidth;
      view.height = this.vctxHeight;
      view.style.width = view.width / 2 + "px";
      view.style.height = view.height / 2 + "px";
      this.vctx = view.getContext("2d");
      this.vctx.imageSmoothingEnabled = false;
      this.vctx.strokeStyle = "#666";
      this.vctx.lineWidth = 1;
      let storgae = window.localStorage.getItem("__map");
      if (storgae) {
        this.map = JSON.parse(storgae);
      }
      this.draw();
      document.addEventListener("mousedown", this.handlerCanvasClick);
    },
    draw() {
      const vctx = this.vctx;
      this.vctx.clearRect(0, 0, this.vctxWidth, this.vctxHeight);
      for (let i = 0; i < this.map.length; i++) {
        let x = i % this.width;
        let y = Math.floor(i / this.width);
        vctx.save();
        if (this.map[i] === -1) {
          vctx.fillStyle = "#fff";
        } else {
          vctx.fillStyle = "#000";
        }
        const rect = this.rect;
        vctx.fillRect(x * rect, y * rect, rect, rect);
        vctx.strokeRect(x * rect, y * rect, rect, rect);
        vctx.restore();
      }
    },

    fill([x, y], color) {
      const vctx = this.vctx;
      const rect = this.rect;
      vctx.fillStyle = color;
      vctx.fillRect(x * rect, y * rect, rect, rect);
      vctx.strokeRect(x * rect, y * rect, rect, rect);
    },
    handlerCanvasClick(e) {
      const rect = this.rect;
      const isClear = e.button === 2;
      let x = Math.floor((e.offsetX * 2) / rect);
      let y = Math.floor((e.offsetY * 2) / rect);
      let idx = y * this.width + x;
      this.map[idx] = isClear ? -1 : -2;
      console.log(x, y);
      this.fill([x, y], isClear ? "#fff" : "#000");

      const mousemoveEvent = e => {
        e = e || window.event;
        let distx = Math.floor((e.offsetX * 2) / rect);
        let disty = Math.floor((e.offsetY * 2) / rect);
        // 插值
        while (distx != x || disty != y) {
          if (distx > x) {
            x++;
          } else if (distx < x) {
            x--;
          }

          if (disty > y) {
            y++;
          } else if (disty < y) {
            y--;
          }
          idx = y * this.width + x;
          this.map[idx] = isClear ? -1 : -2;
          this.fill([x, y], isClear ? "#fff" : "#000");
        }
      };

      const mouseupEvent = () => {
        document.removeEventListener("mousemove", mousemoveEvent);
        document.removeEventListener("mouseup", mouseupEvent);
      };
      document.addEventListener("mousemove", mousemoveEvent);
      document.addEventListener("mouseup", mouseupEvent);
    },
    save() {
      window.localStorage.setItem("__map", JSON.stringify(this.map));
      this.$Message.success("保存成功");
    },
    clear() {
      this.map.fill(-1);
      window.localStorage.removeItem("__map");
      this.draw();
      this.$Message.success("清除成功");
    },
    //
    sleep(t) {
      return new Promise(resolve => setTimeout(resolve, t));
    },
    distance([startX, startY], [distX, distY]) {
      return Math.pow(distX - startX, 2) + Math.pow(distY - startY, 2);
    },
    async findPath() {
      this.draw();
      const start = [this.startPoint.x, this.startPoint.y];
      const end = [this.endPoint.x, this.endPoint.y];

      let map1 = [...this.map];
      map1[start[1] * this.width + start[0]] = null;

      const queue = new BinaryHeap(
        [start],
        (a, b) => this.distance(a, end) - this.distance(b, end)
      );
      let isFind = false;

      const insert = async ([x, y], pre) => {
        // 超出边界不入队
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
        // 遇墙或已走过不入队
        if (map1[y * this.width + x] != -1 || isFind) return;
        // 斜边两侧封闭不入队
        let diffx = x - pre[0];
        let diffy = y - pre[1];
        if (
          map1[(diffy + pre[1]) * this.width + pre[0]] === -2 &&
          map1[pre[1] * this.width + pre[0] + diffx] === -2
        )
          return;

        map1[y * this.width + x] = pre[1] * this.width + pre[0];

        this.fill([x, y], this.fillColor);
        queue.insert([x, y]);

        if (x === end[0] && y === end[1]) {
          isFind = true;
          let idx = y * this.width + x;
          while (idx != null) {
            await this.sleep(5);
            idx = map1[idx];
            this.fill([idx % this.width, Math.floor(idx / this.width)], this.pathColor);
          }
        }

        await this.sleep(5);
      };

      let v = queue.take();
      while (!isFind && v) {
        const [x, y] = v;
        await insert([x, y - 1], [x, y]);
        await insert([x + 1, y - 1], [x, y]);
        await insert([x + 1, y], [x, y]);
        await insert([x + 1, y + 1], [x, y]);
        await insert([x, y + 1], [x, y]);
        await insert([x - 1, y + 1], [x, y]);
        await insert([x - 1, y], [x, y]);
        await insert([x - 1, y - 1], [x, y]);
        v = queue.take();
      }
      if (isFind) {
        this.$Message.success("路径查找成功");
      } else {
        this.$Message.warning("路径查找失败");
      }
    }
  }
};
</script>
<template>
  <div id="app">
    <layout>
      <canvas slot="left"></canvas>
      <div slot="right">
        <Form :label-width="120">
          <FormItem label="起点坐标(x,y)">
            <InputNumber :max="100" :min="0" v-model="startPoint.x" />
            <InputNumber :max="100" :min="0" v-model="startPoint.y" />
          </FormItem>
          <FormItem label="重点坐标(x,y)">
            <InputNumber :max="100" :min="0" v-model="endPoint.x" />
            <InputNumber :max="100" :min="0" v-model="endPoint.y" />
          </FormItem>
          <FormItem>
            <Button @click="save">保存路径</Button>
            <Button @click="clear">清除路径</Button>
            <Button @click="findPath">开始寻路</Button>
          </FormItem>
        </Form>
      </div>
    </layout>
  </div>
</template>
<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
canvas {
  border: 1px solid black;
}
.point-input {
  border: 1px solid;
  border-radius: 3px;
  display: inline-block;
  height: 24px;
  line-height: 24px;
}

.point-input input {
  width: 20px;
  border: none;
  border-radius: 3px;
  height: 100%;
  padding: 0;
  margin: 0;
  text-align: center;
  line-height: 24px;
  vertical-align: bottom;
}
</style>
