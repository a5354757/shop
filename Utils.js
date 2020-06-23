// Utils就是return出来的对象
var Utils=(function(){
    return {
        ce:function(type,style){
            var elem=document.createElement(type);
            // 将style对象的所有属性复制到elem.style对象上，IE8以上
            Object.assign(elem.style,style);
            return elem;
        },
        $c:function(type,parent,style){
            var elem=document.createElement(type);
            // 将style对象的所有属性复制到elem.style对象上，IE8以上
            Object.assign(elem.style,style);
            if(parent)parent.appendChild(elem);
            return elem;
        },
        randoms:function(max,min){
            if(min===undefined) min=0;
            return Math.floor(Math.random()*(max-min)+min);
        },
        randomColor:function(){
            var col="#";
            for(var i=0;i<6;i++){
                col+=this.randoms(16).toString(16);
            }
            return col;
        },
        // 封装版的拖拽
        // 不能再容器内拖拽
        dragOn(elem){
            elem.self=this;
            elem.addEventListener("mousedown",this.mouseHandler);
        },
        dragOff(elem){
            elem.removeEventListener("mousedown",this.mouseHandler);
        },
        mouseHandler(e){
            if(e.type==="mousedown"){
                e.preventDefault();
                // this   是按下的元素
                // document.div=this;
                document.div=e.target;
                document.offset={x:e.offsetX,y:e.offsetY};
                document.self=this.self;
                document.addEventListener("mousemove",this.self.mouseHandler)
                document.addEventListener("mouseup",this.self.mouseHandler)
            }else if(e.type==="mousemove"){
                // this  document
                // this.div  按下的元素
                document.div.style.left=e.clientX-document.offset.x+"px";
                document.div.style.top=e.clientY-document.offset.y+"px";
            }else if(e.type==="mouseup"){
                // this document
                document.removeEventListener("mousemove",document.self.mouseHandler)
                document.removeEventListener("mouseup",document.self.mouseHandler)
            }
        }

    }
})();