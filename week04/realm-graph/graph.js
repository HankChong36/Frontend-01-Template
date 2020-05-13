var Graph = class {
  graph = null;
  constructor(width, height) {
    this.graph = new G6.TreeGraph({
      container: "container",
      width,
      height,
      modes: {
        default: [
          {
            type: "collapse-expand",
            onChange: function onChange(item, collapsed) {
              const data = item.get("model").data;
              data.collapsed = collapsed;
              return true;
            }
          },
          "drag-canvas",
          "zoom-canvas"
        ]
      },
      defaultNode: {
        size: 26,
        anchorPoints: [
          [0, 0.5],
          [1, 0.5]
        ],
        style: {
          fill: "#C6E5FF",
          stroke: "#5B8FF9"
        }
      },
      defaultEdge: {
        type: "cubic-horizontal",
        style: {
          stroke: "#A3B1BF"
        }
      },
      layout: {
        type: "mindmap",
        direction: "H",
        getHeight: () => {
          return 16;
        },
        getWidth: () => {
          return 16;
        },
        getVGap: () => {
          return 10;
        },
        getHGap: () => {
          return 50;
        }
      }
    });
  }

  render(data) {
    let centerX = 0;
    this.graph.node(function (node) {
      console.log(node)
      if (node.id === "Global Object") {
        centerX = node.x;
      }
      return {
        label: node.id,
        labelCfg: {
          position:
            node.children && node.children.length > 0
              ? "left"
              : node.x > centerX
              ? "right"
              : "left",
          offset: 5
        }
      };
    });
    this.graph.data(data); // 加载数据
    this.graph.render();
    this.graph.fitView();
  }
};
