// create a mapper for node size
var nodeSizeMapper = {
	continuousMapper: {
		attr: {
			name: "weight",
			min: 0,
			max: 100
		},
		mapped: {
			min: 15,
			max: 30
		}
	}
};

// call cytoscape web on the `cy` div
$("#cy").cytoscapeweb({

	// define the elements in the graph
	elements: {
		nodes: [
			{ data: { id: "a", weight: 43 }, classes: "foo" },
			{ data: { id: "b", weight: 2 }, classes: "bar" },
			{ data: { id: "c", weight: 88 }, classes: "foo bar" }
		],

		edges: [
			{ data: { id: "ab", source: "a", target: "b", weight: 32 }, classes: "foo" },
			{ data: { id: "bc", source: "b", target: "c", weight: 12 }, classes: "bar baz" },
			{ data: { id: "ca", source: "c", target: "a", weight: 96 }, classes: "baz foo" },
			{ data: { id: "ac", source: "a", target: "c", weight: 65 }, classes: "bar" }
		]
	},

	// define the layout to use
	layout: {
		name: "preset",
		positions: {
			"a": { x: 30, y: 30 },
			"b": { x: 125, y: 131 },
			"c": { x: 200, y: 50 } 
		},
		fit: false,
		stop: function(){
			cy.reset();
			cy.center();
		}
	},

	// define the visual style (like css) of the graph
	style: {
		selectors: {
			"node":{
				shape: "ellipse",
				fillColor: "#888",
				height: nodeSizeMapper,
				width: nodeSizeMapper,
				labelText: {
					passthroughMapper: "id"
				}
			},
			".yay": {
				fillColor: "red",
				lineColor: "red",
				targetArrowColor: "red"
			},
			"edge": {
				lineColor: "#ccc",
				targetArrowColor: "#ccc",
				width: {
					continuousMapper: {
						attr: {
							name: "weight"
						},
						mapped: {
							min: 2,
							max: 5
						}
					}
				},
				targetArrowShape: "triangle"
			},
			"node:selected": {
				fillColor: "#333"
			},
			"edge:selected":{
				lineColor: "#666",
				targetArrowColor: "#666"
			}
		}
	},

	// define the callback for when cytoscape web is ready
	ready: function( cy ){
		window.cy = cy;
	}
});