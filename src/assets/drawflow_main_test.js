var id = document.getElementById("drawflow");
const editor = new Drawflow(id);
editor.reroute = true;
editor.drawflow = {
  drawflow: {
    Home: {
      data: {
        1: {
          id: 1,
          name: "input_data",
          data: {},
          class: "input_data",
          html: `      <div class="relative_workspace_container">
          <div class="absolute_workspace_click_menu" id="absolute_workspace_click_menu_data">
          <div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="input_data"  onclick="drop2(event)">
          <span data-node="input_data"><img data-node="input_data"  style="width:25px;" src="assets/img/data-icon-no-bg.svg" alt=""></span><span data-node="input_data">&nbsp;Data</span>
        </div>
        <div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="filter"  onclick="drop2(event)">
          <span data-node="filter"><img data-node="filter" style="width:25px;" src="assets/img/filter.svg" alt=""></span><span data-node="filter">&nbsp;Filter</span>
        </div>
        <div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="output_data" onclick="drop2(event)">
          <span data-node="output_data"><img data-node="output_data" style="width:25px;" src="assets/img/data-icon-no-bg.svg" alt=""></span><span data-node="output_data">&nbsp;Join</span>
        </div>
          </div>
          <div class="absolute_workspace_menu">
            <div class="workspace_menu">
              <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_data('top_menu')">
            </div>
            <div class="workspace_middle_menu">
              <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_data('left_menu')">
              <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_data('right_menu')">
            </div>
            <div class="workspace_menu">
              <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_data('bottom_menu')">
            </div>
          </div>
          <div class="workspace h-100">
            <div class="stage-card d-flex align-items-center">
              <div class="data-image">
                <img src="assets/img/data-icon-no-bg.svg" alt="">
              </div>
              <div class="step-file-name">
                <div class="step light-text">Step 1: Data</div>
                <div class="file-name heading-3">Prod_01_04_2022</div>
              </div>
              <div class="check-icon"><img src="assets/img/check-icon.svg" alt=""></div>
            </div>
          </div>
        </div>`,
          typenode: false,
          inputs: {},
          outputs: {
            output_1: {
              connections: [],
            },
          },
          pos_x: 347,
          pos_y: 47,
        },
      },
    },
  },
};
editor.start();
//editor.addNode(name, inputs, outputs, posx, posy, class, data, html);
/*editor.addNode('welcome', 0, 0, 50, 50, 'welcome', {}, welcome );
editor.addModule('Other');
*/

// Events!

// in js file
// var event = new Event('myEvent');
// document.dispatchEvent(event);
event_logger = [{ node_id: 1, event_type: "input_data" }];
editor.on("nodeCreated", function (id) {
  const promise = new Promise((resolve, reject) => {
    resolve(event_logger.push({ node_id: id }));
  });
  promise.then(() => {
    if (
      document.getElementById("node-" + id).classList.contains("input_data")
    ) {
      var filter_event = event_logger.find((event) => {
        return event.node_id == id;
      });
      filter_event.event_type = "input_data";
      var data_node_created_event = new CustomEvent("data_node_Created", {
        detail: { _id: id },
      });
      document.dispatchEvent(data_node_created_event);
    }
    if (
      document.getElementById("node-" + id) != null &&
      document.getElementById("node-" + id).classList.contains("output_data")
    ) {
      var filter_event = event_logger.find((event) => {
        return event.node_id == id;
      });
      filter_event.event_type = "output_data";
      var output_node_created_event = new CustomEvent("output_node_Created", {
        detail: { _id: id },
      });
      document.dispatchEvent(output_node_created_event);
    }
    if (
      document.getElementById("node-" + id) != null &&
      document.getElementById("node-" + id).classList.contains("filter")
    ) {
      var filter_event = event_logger.find((event) => {
        return event.node_id == id;
      });
      filter_event.event_type = "filter";
      var filter_node_created_event = new CustomEvent("filter_node_Created", {
        detail: { _id: id },
      });
      document.dispatchEvent(filter_node_created_event);
    }
  });
  // console.log(event_logger);
});

document.addEventListener("filter_exists", (e) => {
  var filter_event = event_logger.find((event) => {
    return event.event_type == "filter";
  });
  var filter_index = event_logger.findIndex((event) => {
    return event.event_type == "filter";
  });
  if (filter_event != undefined && filter_event.node_id != e.detail._id) {
    editor.removeNodeId("node-" + e.detail._id);
    event_logger.pop();
  }
});

document.addEventListener("if_output_exists", (e) => {
  var output_event = event_logger.find((event) => {
    return event.event_type == "output_data";
  });
  var output_index = event_logger.findIndex((event) => {
    return event.event_type == "output_data";
  });
  if (output_event != undefined && output_event.node_id != e.detail._id) {
    editor.removeNodeId("node-" + e.detail._id);
    event_logger.pop();
  }
});

document.addEventListener("if_data_exists", (e) => {
  var input_event = event_logger.find((event) => {
    return event.event_type == "input_data";
  });
  var input_index = event_logger.findIndex((event) => {
    return event.event_type == "input_data";
  });
  if (input_event != undefined && input_event.node_id != e.detail._id) {
    editor.removeNodeId("node-" + e.detail._id);
    event_logger.pop();
  }
});

document.addEventListener("filter_empty", (e) => {
  delete_node = event_logger.find((data) => {
    return data.event_type == "filter";
  });
  delete_index = event_logger.findIndex((data) => {
    return data.event_type == "filter";
  });
  editor.removeNodeId("node-" + delete_node.node_id);
  event_logger.splice(delete_index, 1);
});

document.addEventListener("new_filter_created", (e) => {
  // var node_id = event_logger[event_logger.length - 1] + 1;
  var filterly = `<div class="relative_workspace_container">
  <div class="absolute_workspace_click_menu" id="absolute_workspace_click_menu_filter">
  <div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="input_data"  onclick="drop2(event)">
  <span data-node="input_data"><img style="width:25px;" src="assets/img/data-icon-no-bg.svg" alt=""></span><span data-node="input_data">&nbsp;Data</span>
</div>
<div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="filter"  onclick="drop2(event)">
  <span data-node="filter"><img style="width:25px;" src="assets/img/filter.svg" alt=""></span><span data-node="filter">&nbsp;Filter</span>
</div>
<div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="output_data" onclick="drop2(event)">
  <span data-node="output_data"><img style="width:25px;" src="assets/img/data-icon-no-bg.svg" alt=""></span><span data-node="output_data">&nbsp;Join</span>
</div>
  </div>
  <div class="absolute_workspace_menu">
    <div class="workspace_menu">
      <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_filter('top_menu')">
    </div>
    <div class="workspace_middle_menu">
      <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_filter('left_menu')">
      <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_filter('right_menu')">
    </div>
    <div class="workspace_menu">
      <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_filter('bottom_menu')">
    </div>
  </div>
  <div class="workspace h-100">
    <div class="stage-card d-flex align-items-center">
      <div class="data-image">
        <img src="assets/Images/Filter.svg" alt="">
      </div>
      <div class="step-file-name">
        <div class="step light-text">Step 2: Filter</div>
        <div class="file-name heading-3">Prod_01_04_2022</div>
      </div>
      <div class="check-icon"><img src="assets/img/check-icon.svg" alt=""></div>
    </div>
  </div>
</div>`;
  var pos_x = 347;
  var pos_y = 207;
  editor.addNode("filter", 1, 1, pos_x, pos_y, "filter", {}, filterly);
});

document.addEventListener("catalog_selected", (e) => {
  var output_event = event_logger.find((event) => {
    return event.event_type == "output_data";
  });
  if (output_event == undefined) {
    var outputly = `<div class="relative_workspace_container">
    <div class="absolute_workspace_click_menu" id="absolute_workspace_click_menu_output">
      <div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="input_data"  onclick="drop2(event)">
        <span data-node="input_data"><img style="width:25px;" src="assets/img/data-icon-no-bg.svg" alt=""></span><span data-node="input_data">&nbsp;Data</span>
      </div>
      <div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="filter"  onclick="drop2(event)">
        <span data-node="filter"><img style="width:25px;" src="assets/img/filter.svg" alt=""></span><span data-node="filter">&nbsp;Filter</span>
      </div>
      <div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="output_data" onclick="drop2(event)">
        <span data-node="output_data"><img style="width:25px;" src="assets/img/data-icon-no-bg.svg" alt=""></span><span data-node="output_data">&nbsp;Join</span>
      </div>
    </div>
    <div class="absolute_workspace_menu">
      <div class="workspace_menu">
        <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_output('top_menu')">
      </div>
      <div class="workspace_middle_menu">
        <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_output('left_menu')">
        <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_output('right_menu')">
      </div>
      <div class="workspace_menu">
        <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_output('bottom_menu')">
      </div>
    </div>
    <div class="workspace h-100">
      <div class="stage-card d-flex align-items-center">
        <div class="data-image">
          <img src="assets/Images/Join.svg" alt="">
        </div>
        <div class="step-file-name">
          <div class="step light-text">Step 3: Join</div>
          <div class="file-name heading-3">${e.detail.catalog_name}</div>
        </div>
        <div class="check-icon"><img src="assets/img/check-icon.svg" alt=""></div>
      </div>
    </div>
  </div>`;
    var pos_x = 347;
    var pos_y = 357;
    editor.addNode(
      "output_data",
      1,
      0,
      pos_x,
      pos_y,
      "output_data",
      {},
      outputly
    );
  }
});

document.addEventListener("filter_applied", (e) => {
  var filter_event = event_logger.find((event) => {
    return event.event_type == "filter";
  });
  var data_event = event_logger.find((event) => {
    return event.event_type == "input_data";
  });
  console.log(filter_event);
  console.log(data_event);
  if (data_event != undefined && filter_event != undefined) {
    editor.addConnection(
      data_event.node_id,
      filter_event.node_id,
      "output_" + data_event.node_id,
      "input_" + filter_event.node_id
    );
  } else {
    var data_not_found = new CustomEvent("data_not_found");
    document.dispatchEvent(data_not_found);
  }
});

document.addEventListener("data_applied", (e) => {
  var filter_index = event_logger.findIndex((event) => {
    return event.event_type == "filter";
  });
  var input_index = event_logger.findIndex((event) => {
    return event.event_type == "input_data";
  });
  var output_event = event_logger.find((event) => {
    return event.event_type == "output_data";
  });
  var filter_event = event_logger.find((event) => {
    return event.event_type == "filter";
  });
  var input_event = event_logger.find((event) => {
    return event.event_type == "input_data";
  });
  if (
    filter_index != -1 &&
    filter_event != undefined &&
    output_event != undefined
  ) {
    if (input_event != undefined) {
      editor.addConnection(
        input_event.node_id,
        filter_event.node_id,
        "output_" + input_event.node_id,
        "input_" + filter_event.node_id
      );
    }
    editor.addConnection(
      filter_event.node_id,
      output_event.node_id,
      "output_" + filter_event.node_id,
      "input_" + output_event.node_id
    );
  }
  if (
    input_index != -1 &&
    filter_index == -1 &&
    input_event != undefined &&
    output_event != undefined
  ) {
    editor.addConnection(
      input_event.node_id,
      output_event.node_id,
      "output_" + input_event.node_id,
      "input_" + output_event.node_id
    );
  }
});

document.addEventListener("filter_edit_mode", (e) => {
  var filter_event = event_logger.find((event) => {
    return event.event_type == "filter";
  });
  var input_event = event_logger.find((event) => {
    return event.event_type == "input_data";
  });
  if (filter_event != undefined && input_event != undefined) {
    editor.removeSingleConnection(
      input_event.node_id,
      filter_event.node_id,
      "output_" + input_event.node_id,
      "input_" + filter_event.node_id
    );
  }
});

document.addEventListener("data_edit_mode", (e) => {
  var filter_index = event_logger.findIndex((event) => {
    return event.event_type == "filter";
  });
  var input_index = event_logger.findIndex((event) => {
    return event.event_type == "input_data";
  });
  var output_event = event_logger.find((event) => {
    return event.event_type == "output_data";
  });
  var filter_event = event_logger.find((event) => {
    return event.event_type == "filter";
  });
  var input_event = event_logger.find((event) => {
    return event.event_type == "input_data";
  });
  if (
    filter_index != -1 &&
    filter_event != undefined &&
    output_event != undefined
  ) {
    editor.removeSingleConnection(
      filter_event.node_id,
      output_event.node_id,
      "output_" + filter_event.node_id,
      "input_" + output_event.node_id
    );
  } else if (
    input_index != -1 &&
    filter_index == -1 &&
    input_event != undefined &&
    output_event != undefined
  ) {
    editor.removeSingleConnection(
      input_event.node_id,
      output_event.node_id,
      "output_" + input_event.node_id,
      "input_" + output_event.node_id
    );
  }
});

editor.on("nodeRemoved", function (id) {
  var deleted_event = event_logger.find((event_data) => {
    return event_data.node_id == id;
  });
  if (deleted_event != undefined && deleted_event.event_type == "filter") {
    var n = 0;
    for (i = 0; i < event_logger.length; i++) {
      if (event_logger[i].event_type == "filter") {
        n++;
      }
    }
    if (n == 1) {
      var filternodedeletedevent = new CustomEvent("filter_node_deleted");
      document.dispatchEvent(filternodedeletedevent);
      event_logger.splice(
        event_logger.findIndex((data) => {
          return data.node_id == deleted_event.node_id;
        }),
        1
      );
    }
  }
  if (deleted_event.event_type == "input_data") {
    var data_node_deleted = new CustomEvent("data_node_deleted");
    document.dispatchEvent(data_node_deleted);
    event_logger.splice(
      event_logger.findIndex((data) => {
        return data.node_id == deleted_event.node_id;
      }),
      1
    );
  }
  var original_join_event = event_logger.find((data) => {
    return data.event_type == "output_data";
  });
  if (
    deleted_event.event_type == "output_data" &&
    original_join_event.node_id == id
  ) {
    var output_node_deleted = new CustomEvent("output_node_deleted");
    document.dispatchEvent(output_node_deleted);
    event_logger.splice(
      event_logger.findIndex((data) => {
        return data.node_id == deleted_event.node_id;
      }),
      1
    );
  } else {
  }
});

editor.on("nodeSelected", function (id) {
  if (document.getElementById("node-" + id).classList.contains("filter")) {
    var filter_node_selected = new CustomEvent("filter_node_selected");
    document.dispatchEvent(filter_node_selected);
  }
  if (document.getElementById("node-" + id).classList.contains("input_data")) {
    var data_node_selected = new CustomEvent("data_node_selected");
    document.dispatchEvent(data_node_selected);
  }
  if (document.getElementById("node-" + id).classList.contains("output_data")) {
    var data_node_selected = new CustomEvent("output_node_selected");
    document.dispatchEvent(data_node_selected);
  }
});

editor.on("moduleCreated", function (name) {
  // console.log("Module Created " + name);
});

editor.on("moduleChanged", function (name) {
  // console.log("Module Changed " + name);
});

editor.on("connectionCreated", function (connection) {
  if (
    document
      .getElementById("node-" + connection.output_id)
      .classList.contains("input_data")
  ) {
    if (
      document
        .getElementById("node-" + connection.input_id)
        .classList.contains("filter")
    ) {
      var filter_data_connection_Created = new CustomEvent(
        "filter_data_connection_Created"
      );
      document.dispatchEvent(filter_data_connection_Created);
    }
    if (
      document
        .getElementById("node-" + connection.input_id)
        .classList.contains("output_data")
    ) {
      var data_output_connection_Created = new CustomEvent(
        "data_output_connection_Created"
      );
      document.dispatchEvent(data_output_connection_Created);
    }
  }
  if (
    document
      .getElementById("node-" + connection.output_id)
      .classList.contains("filter")
  ) {
    if (
      document
        .getElementById("node-" + connection.input_id)
        .classList.contains("output_data")
    ) {
      var filter_output_connection_Created = new CustomEvent(
        "filter_output_connection_Created"
      );
      document.dispatchEvent(filter_output_connection_Created);
    }
  }
});

editor.on("connectionRemoved", function (connection) {
  if (
    document
      .getElementById("node-" + connection.output_id)
      .classList.contains("input_data")
  ) {
    if (
      document
        .getElementById("node-" + connection.input_id)
        .classList.contains("filter")
    ) {
      connection_removal = event_logger.find((data) => {
        return data.event_type == "output_data";
      });
      if (connection_removal != undefined) {
        editor.removeSingleConnection(
          connection.input_id,
          connection_removal.node_id,
          "output_" + connection.input_id,
          "input_" + connection_removal.node_id
        );
      }
      var filter_data_connection_removed = new CustomEvent(
        "filter_data_connection_removed"
      );
      document.dispatchEvent(filter_data_connection_removed);
    }
    if (
      document
        .getElementById("node-" + connection.input_id)
        .classList.contains("output_data")
    ) {
      var data_output_connection_removed = new CustomEvent(
        "data_output_connection_removed"
      );
      document.dispatchEvent(data_output_connection_removed);
    }
  }
  if (
    document
      .getElementById("node-" + connection.output_id)
      .classList.contains("filter")
  ) {
    if (
      document
        .getElementById("node-" + connection.input_id)
        .classList.contains("output_data")
    ) {
      var filter_output_connection_removed = new CustomEvent(
        "filter_output_connection_removed"
      );
      document.dispatchEvent(filter_output_connection_removed);
    }
  }
});

// editor.on("mouseMove", function (position) {
//   console.log("Position mouse x:" + position.x + " y:" + position.y);
// });

editor.on("nodeMoved", function (id) {
  // console.log("Node moved " + id);
});

editor.on("zoom", function (zoom) {
  // console.log("Zoom level " + zoom);
});

editor.on("translate", function (position) {
  // console.log("Translate x:" + position.x + " y:" + position.y);
});

editor.on("addReroute", function (id) {
  // console.log("Reroute added " + id);
});

editor.on("removeReroute", function (id) {
  // console.log("Reroute  removed " + id);
});

/* DRAG EVENT */

/* Mouse and Touch Actions */

// var elements = document.getElementsByClassName("drag-drawflow");
// for (var i = 0; i < elements.length; i++) {
//   // elements[i].addEventListener("touchend", drop, false);
//   // elements[i].addEventListener("touchmove", positionMobile, false);
//   // elements[i].addEventListener("touchstart", drag, false);
//   elements[i].addEventListener("click", drop2, false);
// }

var mobile_item_selec = "";
var mobile_last_move = null;
function positionMobile(ev) {
  mobile_last_move = event;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function show_data(data) {
  elem = document.getElementById(
    "absolute_workspace_click_menu_data"
  ).classList;
  if (elem.contains(data)) {
    elem.remove("top_menu", "bottom_menu", "right_menu", "left_menu");
  } else if (
    elem.contains("top_menu") ||
    elem.contains("bottom_menu") ||
    elem.contains("left_menu") ||
    elem.contains("right_menu")
  ) {
    elem.remove("top_menu", "bottom_menu", "right_menu", "left_menu");
    document
      .getElementById("absolute_workspace_click_menu_data")
      .classList.toggle(data);
  } else {
    elem.toggle(data);
  }
}

function show_filter(data) {
  elem = document.getElementById(
    "absolute_workspace_click_menu_filter"
  ).classList;
  if (elem.contains(data)) {
    elem.remove("top_menu", "bottom_menu", "right_menu", "left_menu");
  } else if (
    elem.contains("top_menu") ||
    elem.contains("bottom_menu") ||
    elem.contains("left_menu") ||
    elem.contains("right_menu")
  ) {
    elem.remove("top_menu", "bottom_menu", "right_menu", "left_menu");
    document
      .getElementById("absolute_workspace_click_menu_filter")
      .classList.toggle(data);
  } else {
    elem.toggle(data);
  }
}
function show_output(data) {
  elem = document.getElementById(
    "absolute_workspace_click_menu_output"
  ).classList;
  if (elem.contains(data)) {
    elem.remove("top_menu", "bottom_menu", "right_menu", "left_menu");
  } else if (
    elem.contains("top_menu") ||
    elem.contains("bottom_menu") ||
    elem.contains("left_menu") ||
    elem.contains("right_menu")
  ) {
    elem.remove("top_menu", "bottom_menu", "right_menu", "left_menu");
    document
      .getElementById("absolute_workspace_click_menu_output")
      .classList.toggle(data);
  } else {
    elem.toggle(data);
  }
}
document.addEventListener("click", (e) => {
  if (
    e.target.classList != "add_node" &&
    e.target.classList != "drag-drawflow" &&
    document.getElementById("absolute_workspace_click_menu_data") != undefined
  ) {
    document
      .getElementById("absolute_workspace_click_menu_data")
      .classList.remove("top_menu", "bottom_menu", "right_menu", "left_menu");
  }
  if (
    e.target.classList != "add_node" &&
    e.target.classList != "drag-drawflow" &&
    document.getElementById("absolute_workspace_click_menu_filter") != undefined
  ) {
    document
      .getElementById("absolute_workspace_click_menu_filter")
      .classList.remove("top_menu", "bottom_menu", "right_menu", "left_menu");
  }
  if (
    e.target.classList != "add_node" &&
    e.target.classList != "drag-drawflow" &&
    document.getElementById("absolute_workspace_click_menu_output") != undefined
  ) {
    document
      .getElementById("absolute_workspace_click_menu_output")
      .classList.remove("top_menu", "bottom_menu", "right_menu", "left_menu");
  }
});
function drag(ev) {
  if (ev.type === "touchstart") {
    mobile_item_selec = ev.target
      .closest(".drag-drawflow")
      .getAttribute("data-node");
  } else {
    ev.dataTransfer.setData("node", ev.target.getAttribute("data-node"));
  }
}

function drop(ev) {
  if (ev.type === "touchend") {
    var parentdrawflow = document
      .elementFromPoint(
        mobile_last_move.touches[0].clientX,
        mobile_last_move.touches[0].clientY
      )
      .closest("#drawflow");
    if (parentdrawflow != null) {
      addNodeToDrawFlow(
        mobile_item_selec,
        mobile_last_move.touches[0].clientX,
        mobile_last_move.touches[0].clientY
      );
    }
    mobile_item_selec = "";
  } else {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("node");
    addNodeToDrawFlow(data, ev.clientX, ev.clientY);
  }
}

function drop2(ev) {
  if (ev.type === "click") {
    mobile_item_selec = ev.target.getAttribute("data-node");
    addNodeToDrawFlow2(mobile_item_selec);
  }
}

function addNodeToDrawFlow2(name) {
  if (editor.editor_mode === "fixed") {
    return false;
  }
  // pos_x =
  //   pos_x *
  //     (editor.precanvas.clientWidth /
  //       (editor.precanvas.clientWidth * editor.zoom)) -
  //   editor.precanvas.getBoundingClientRect().x *
  //     (editor.precanvas.clientWidth /
  //       (editor.precanvas.clientWidth * editor.zoom));
  // pos_y =
  //   pos_y *
  //     (editor.precanvas.clientHeight /
  //       (editor.precanvas.clientHeight * editor.zoom)) -
  //   editor.precanvas.getBoundingClientRect().y *
  //     (editor.precanvas.clientHeight /
  //       (editor.precanvas.clientHeight * editor.zoom));
  switch (name) {
    case "input_data":
      var input_data = `
      <div class="relative_workspace_container">
      <div class="absolute_workspace_click_menu" id="absolute_workspace_click_menu_data">
        <div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="input_data"  onclick="drop2(event)">
          <span data-node="input_data"><img data-node="input_data" style="width:25px;" src="assets/img/data-icon-no-bg.svg" alt=""></span><span data-node="input_data">&nbsp;Data</span>
        </div>
        <div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="filter"  onclick="drop2(event)">
          <span data-node="filter"><img data-node="filter" style="width:25px;" src="assets/img/filter.svg" alt=""></span><span data-node="filter">&nbsp;Filter</span>
        </div>
        <div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="output_data" onclick="drop2(event)">
          <span data-node="output_data"><img data-node="output_data" style="width:25px;" src="assets/img/data-icon-no-bg.svg" alt=""></span><span data-node="output_data">&nbsp;Join</span>
        </div>
      </div>
      <div class="absolute_workspace_menu">
        <div class="workspace_menu">
          <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_data('top_menu')">
        </div>
        <div class="workspace_middle_menu">
          <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_data('left_menu')">
          <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_data('right_menu')">
        </div>
        <div class="workspace_menu">
          <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_data('bottom_menu')">
        </div>
      </div>
      <div class="workspace h-100">
        <div class="stage-card d-flex align-items-center">
          <div class="data-image">
            <img src="assets/Images/Join.svg" alt="">
          </div>
          <div class="step-file-name">
            <div class="step light-text">Step 3: Join</div>
            <div class="file-name heading-3">Prod_01_04_2022</div>
          </div>
          <div class="check-icon"><img src="assets/img/check-icon.svg" alt=""></div>
        </div>
      </div>
    </div>
        `;
      editor.addNode("input_data", 0, 1, 347, 87, "input_data", {}, input_data);
      break;
    case "output_data":
      var output_data = `
    <div class="relative_workspace_container">
    <div class="absolute_workspace_click_menu" id="absolute_workspace_click_menu_output">
      <div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="input_data"  onclick="drop2(event)">
        <span data-node="input_data"><img data-node="input_data" style="width:25px;" src="assets/img/data-icon-no-bg.svg" alt=""></span><span data-node="input_data">&nbsp;Data</span>
      </div>
      <div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="filter"  onclick="drop2(event)">
        <span data-node="filter"><img data-node="filter" style="width:25px;" src="assets/img/filter.svg" alt=""></span><span data-node="filter">&nbsp;Filter</span>
      </div>
      <div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="output_data" onclick="drop2(event)">
        <span data-node="output_data"><img data-node="output_data" style="width:25px;" src="assets/img/data-icon-no-bg.svg" alt=""></span><span data-node="output_data">&nbsp;Join</span>
      </div>
    </div>
    <div class="absolute_workspace_menu">
      <div class="workspace_menu">
        <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_output('top_menu')">
      </div>
      <div class="workspace_middle_menu">
        <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_output('left_menu')">
        <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_output('right_menu')">
      </div>
      <div class="workspace_menu">
        <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_output('bottom_menu')">
      </div>
    </div>
    <div class="workspace h-100">
      <div class="stage-card d-flex align-items-center">
        <div class="data-image">
          <img src="assets/Images/Join.svg" alt="">
        </div>
        <div class="step-file-name">
          <div class="step light-text">Step 3: Join</div>
          <div class="file-name heading-3">Prod_01_04_2022</div>
        </div>
        <div class="check-icon"><img src="assets/img/check-icon.svg" alt=""></div>
      </div>
    </div>
  </div>
    `;
      editor.addNode(
        "output_data",
        1,
        0,
        347,
        357,
        "output_data",
        {},
        output_data
      );
      break;
    case "filter":
      var filter = `
    <div class="relative_workspace_container">
    <div class="absolute_workspace_click_menu" id="absolute_workspace_click_menu_filter">
      <div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="input_data"  onclick="drop2(event)">
        <span data-node="input_data"><img data-node="input_data" style="width:25px;" src="assets/img/data-icon-no-bg.svg" alt=""></span><span data-node="input_data">&nbsp;Data</span>
      </div>
      <div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="filter"  onclick="drop2(event)">
        <span data-node="filter"><img data-node="filter" style="width:25px;" src="assets/img/filter.svg" alt=""></span><span data-node="filter">&nbsp;Filter</span>
      </div>
      <div class="drag-drawflow custom_drag_drawflow" draggable="true" data-node="output_data" onclick="drop2(event)">
        <span data-node="output_data"><img data-node="output_data" style="width:25px;" src="assets/img/data-icon-no-bg.svg" alt=""></span><span data-node="output_data">&nbsp;Join</span>
      </div>
    </div>
    <div class="absolute_workspace_menu">
      <div class="workspace_menu">
        <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_filter('top_menu')">
      </div>
      <div class="workspace_middle_menu">
        <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_filter('left_menu')">
        <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_filter('right_menu')">
      </div>
      <div class="workspace_menu">
        <img class="add_node" src="assets/Images/Add.svg" alt="" onclick="show_filter('bottom_menu')">
      </div>
    </div>
    <div class="workspace h-100">
      <div class="stage-card d-flex align-items-center">
        <div class="data-image">
          <img src="assets/Images/Filter.svg" alt="">
        </div>
        <div class="step-file-name">
          <div class="step light-text">Step 2: Filter</div>
          <div class="file-name heading-3">Prod_01_04_2022</div>
        </div>
        <div class="check-icon"><img src="assets/img/check-icon.svg" alt=""></div>
      </div>
    </div>
  </div>
            `;
      editor.addNode("filter", 1, 1, 347, 207, "filter", {}, filter);
      break;
    default:
  }
}

function addNodeToDrawFlow(name, pos_x, pos_y) {
  if (editor.editor_mode === "fixed") {
    return false;
  }
  pos_x =
    pos_x *
      (editor.precanvas.clientWidth /
        (editor.precanvas.clientWidth * editor.zoom)) -
    editor.precanvas.getBoundingClientRect().x *
      (editor.precanvas.clientWidth /
        (editor.precanvas.clientWidth * editor.zoom));
  pos_y =
    pos_y *
      (editor.precanvas.clientHeight /
        (editor.precanvas.clientHeight * editor.zoom)) -
    editor.precanvas.getBoundingClientRect().y *
      (editor.precanvas.clientHeight /
        (editor.precanvas.clientHeight * editor.zoom));
  switch (name) {
    case "input_data":
      var input_data = `
      <div class="workspace h-100">
  <div class="stage-card d-flex align-items-center">
    <div class="data-image">
      <img src="assets/img/data-icon-no-bg.svg" alt="">
    </div>
    <div class="step-file-name">
      <div class="step light-text">Step 1: Data</div>
      <div class="file-name heading-3">Prod_01_04_2022</div>
    </div>
    <div class="check-icon"><img src="assets/img/check-icon.svg" alt=""></div>
  </div>
</div>
        `;
      editor.addNode("input_data", 0, 1, 347, 87, "input_data", {}, input_data);
      break;
    case "output_data":
      var output_data = `
      <div class="workspace h-100">
      <div class="stage-card d-flex align-items-center">
        <div class="data-image">
          <img src="assets/Images/Join.svg" alt="">
        </div>
        <div class="step-file-name">
          <div class="step light-text">Step 3: Join</div>
          <div class="file-name heading-3">Prod_01_04_2022</div>
        </div>
        <div class="check-icon"><img src="assets/img/check-icon.svg" alt=""></div>
      </div>
    </div>
          `;
      editor.addNode(
        "output_data",
        1,
        0,
        347,
        257,
        "output_data",
        {},
        output_data
      );
      break;
    case "filter":
      var filter = `
      <div class="workspace h-100">
      <div class="stage-card d-flex align-items-center">
        <div class="data-image">
          <img src="assets/Images/Filter.svg" alt="">
        </div>
        <div class="step-file-name">
          <div class="step light-text">Step 2: Filter</div>
          <div class="file-name heading-3">Prod_01_04_2022</div>
        </div>
        <div class="check-icon"><img src="assets/img/check-icon.svg" alt=""></div>
      </div>
    </div>
            `;
      editor.addNode("filter", 1, 1, 347, 157, "filter", {}, filter);
      break;
    default:
  }
}

var transform = "";
function showpopup(e) {
  e.target.closest(".drawflow-node").style.zIndex = "9999";
  e.target.children[0].style.display = "block";
  //document.getElementById("modalfix").style.display = "block";

  //e.target.children[0].style.transform = 'translate('+translate.x+'px, '+translate.y+'px)';
  transform = editor.precanvas.style.transform;
  editor.precanvas.style.transform = "";
  editor.precanvas.style.left = editor.canvas_x + "px";
  editor.precanvas.style.top = editor.canvas_y + "px";

  //e.target.children[0].style.top  =  -editor.canvas_y - editor.container.offsetTop +'px';
  //e.target.children[0].style.left  =  -editor.canvas_x  - editor.container.offsetLeft +'px';
  editor.editor_mode = "fixed";
}

function closemodal(e) {
  e.target.closest(".drawflow-node").style.zIndex = "2";
  e.target.parentElement.parentElement.style.display = "none";
  //document.getElementById("modalfix").style.display = "none";
  editor.precanvas.style.transform = transform;
  editor.precanvas.style.left = "0px";
  editor.precanvas.style.top = "0px";
  editor.editor_mode = "edit";
}

function changeModule(event) {
  var all = document.querySelectorAll(".menu ul li");
  for (var i = 0; i < all.length; i++) {
    all[i].classList.remove("selected");
  }
  event.target.classList.add("selected show_menu");
  // event.target.classList.add("show_menu");
}

function changeMode(option) {
  if (option == "lock") {
    lock.style.display = "none";
    unlock.style.display = "block";
  } else {
    lock.style.display = "block";
    unlock.style.display = "none";
  }
}
