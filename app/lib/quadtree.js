/**
 * Quad tree from agar.io
 * Modifications:
 *   - Export QUAD variable
 */

var QUAD={};QUAD.init=function(args){var TOP_LEFT=0;var TOP_RIGHT=1;var BOTTOM_LEFT=2;var BOTTOM_RIGHT=3;var PARENT=4;var maxChildren=args.maxChildren||2;var maxDepth=args.maxDepth||4;function Node(x,y,w,h,depth){this.x=x;this.y=y;this.w=w;this.h=h;this.depth=depth;this.items=[];this.nodes=[];}
Node.prototype={x:0,y:0,w:0,h:0,depth:0,items:null,nodes:null,exists:function(selector){for(var i=0;i<this.items.length;++i){var item=this.items[i];if(item.x>=selector.x&&item.y>=selector.y&&item.x<selector.x+ selector.w&&item.y<selector.y+ selector.h){return true;}}
if(this.nodes.length!=0){var self=this;return this.findOverlappingNodes(selector,function(dir){return self.nodes[dir].exists(selector);});}
return false;},retrieve:function(item,callback){for(var i=0;i<this.items.length;++i){callback(this.items[i]);}
if(this.nodes.length!=0){var self=this;this.findOverlappingNodes(item,function(dir){self.nodes[dir].retrieve(item,callback);});}},insert:function(item){if(this.nodes.length!=0){var i=this.findInsertNode(item);this.nodes[i].insert(item);}else{if(this.items.length>=maxChildren&&this.depth<maxDepth){this.divide();this.nodes[this.findInsertNode(item)].insert(item);}else{this.items.push(item);}}},findInsertNode:function(item){if(item.x<this.x+(this.w/2)){if(item.y<this.y+(this.h/2)){return TOP_LEFT;}
return BOTTOM_LEFT;}
if(item.y<this.y+(this.h/2)){return TOP_RIGHT;}
return BOTTOM_RIGHT;},findOverlappingNodes:function(item,callback){if(item.x<this.x+(this.w/2)){if(item.y<this.y+(this.h/2)){if(callback(TOP_LEFT))return true;}
if(item.y>=this.y+ this.h/2){if(callback(BOTTOM_LEFT))return true;}}
if(item.x>=this.x+(this.w/2)){if(item.y<this.y+(this.h/2)){if(callback(TOP_RIGHT))return true;}
if(item.y>=this.y+ this.h/2){if(callback(BOTTOM_RIGHT))return true;}}
return false;},divide:function(){var childrenDepth=this.depth+ 1;var width=(this.w/2);var height=(this.h/2);this.nodes.push(new Node(this.x,this.y,width,height,childrenDepth));this.nodes.push(new Node(this.x+ width,this.y,width,height,childrenDepth));this.nodes.push(new Node(this.x,this.y+ height,width,height,childrenDepth));this.nodes.push(new Node(this.x+ width,this.y+ height,width,height,childrenDepth));var oldChildren=this.items;this.items=[];for(var i=0;i<oldChildren.length;i++){this.insert(oldChildren[i]);}},clear:function(){for(var i=0;i<this.nodes.length;i++){this.nodes[i].clear();}
this.items.length=0;this.nodes.length=0;}};var internalSelector={x:0,y:0,w:0,h:0};return{root:(function(){return new Node(args.minX,args.minY,args.maxX- args.minX,args.maxY- args.minY,0);}()),insert:function(item){this.root.insert(item);},retrieve:function(selector,callback){this.root.retrieve(selector,callback);},retrieve2:function(x,y,w,h,callback){internalSelector.x=x;internalSelector.y=y;internalSelector.w=w;internalSelector.h=h;this.root.retrieve(internalSelector,callback);},exists:function(selector){return this.root.exists(selector);},clear:function(){this.root.clear();}};};

module.exports = QUAD;
