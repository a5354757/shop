function Pagination(el,option){
    this.el=document.querySelector(el);
    this.option=option;
    this.option.pageInfo.totalPage=Math.ceil(this.option.pageInfo.totalData/this.option.pageInfo.pageSize)
    this.nul;
    //默认执行初始化对象
    this.init()
}
//默认触发
Pagination.prototype.init=function(){
    this.setStyle();
    this.creatPageTag();
    this.creatPage();
    this.add();
    this.select();
}

// 设置分页标签容器样式
Pagination.prototype.setStyle=function(){
    this.el.style.display = 'flex';
    this.el.style.justifyContent = 'center';
    this.el.style.alignItems = 'center';
}

//创建分页标签
Pagination.prototype.creatPageTag=function(){
    let pageTag=this.option.pageTag;
    for (let prop in pageTag) {
        let p = document.createElement('p');
        if (pageTag[prop]) {
            p.innerText = pageTag[prop];
            p.style.margin = '0px 5px';
            p.style.padding = '0px 5px';
            p.style.border = '1px solid black';
            p.style.display = 'inline-block';
        }
        this.el.appendChild(p)
    };
}

Pagination.prototype.creatPage=function(){
    let pageTag=this.option.pageTag;
    let pageInfo=this.option.pageInfo;
    this.nul = this.el.querySelector('p:nth-child(3)');
    this.nul.innerHTML='';
    // 创建分页页码
    // pageNum<5     1 2 3 4 5 ... 99 100
    // pageNum==5     1 2 3 4 5 6 7 ... 99 100
    // pageNum>5 && pageNum < 总页数-4    1 2 ... 4 5 [6] 7 8 ... 99 100 
    // pageNum >= 总页数-4        1 2 ... 96 97 98 99 100

    if (pageInfo.pageNum < 5) {
        for (let i = 1; i <= 5; i++) this.creatP('p', i);
        this.creatP('span', '...');
        this.creatP('p', parseInt(pageInfo.totalPage) - 1);
        this.creatP('p', parseInt(pageInfo.totalPage));
    }else if (pageInfo.pageNum == 5) {
        for (let i = 1; i <= 7; i++) this.creatP('p', i);
        this.creatP('span', '...');
        this.creatP('p', parseInt(pageInfo.totalPage) - 1);
        this.creatP('p', parseInt(pageInfo.totalPage));
    }else if (5 < pageInfo.pageNum && pageInfo.pageNum < parseInt(pageInfo.totalPage) - 4) {
        this.creatP('p', 1);
        this.creatP('p', 2);
        this.creatP('span', '...');
        for (let i = pageInfo.pageNum - 2; i <= pageInfo.pageNum + 2; i++) this.creatP('p', i);
        this.creatP('span', '...');
        this.creatP('p', parseInt(pageInfo.totalPage) - 1);
        this.creatP('p', parseInt(pageInfo.totalPage));
    }else if (pageInfo.pageNum >= parseInt(pageInfo.totalPage) - 4) {
        this.creatP('p', 1);
        this.creatP('p', 2);
        this.creatP('span', '...');
        for (let i = pageInfo.pageNum - 5; i <= pageInfo.totalPage; i++) this.creatP('p', i);
    };
    
    
    // 禁用分页按钮
    if(pageInfo.pageNum==1){
        this.el.children[0].style.background='#ccc';
        this.el.children[1].style.background='#ccc';
        
    }else{
        this.el.children[0].style.background='';
        this.el.children[1].style.background='';
    } 
    if(pageInfo.pageNum==pageInfo.totalPage){
        this.el.children[3].style.background='#ccc';
        this.el.children[4].style.background='#ccc';
    } else{
        this.el.children[3].style.background='';
        this.el.children[4].style.background='';
    } 
};

// 增加点击事件
Pagination.prototype.add=function(){
    let pageTag=this.option.pageTag;
    let pageInfo=this.option.pageInfo;
    this.el.addEventListener('click',  (e) =>{
        if (e.target.innerText == pageTag.first) {
            pageInfo.pageNum = 1;
            console.log(this);
            this.creatPage();
        }
        if (e.target.innerText == pageTag.prev) {
            if(pageInfo.pageNum>1){
                pageInfo.pageNum -= 1;
            }
            this.creatPage();
        }
        if (e.target.innerText == pageTag.next) {
            if(pageInfo.pageNum<100){
                pageInfo.pageNum += 1;
            }
            this.creatPage();
        }
        if (e.target.innerText == pageTag.last) {
            pageInfo.pageNum = parseInt(pageInfo.totalPage);
            this.creatPage();
        }
        if(parseInt(e.target.innerText)>0){
            pageInfo.pageNum=parseInt(e.target.innerText);
            this.creatPage();
        } 
    })
}

// 创建html标签
Pagination.prototype.creatP=function(el,cont){
    let pageInfo=this.option.pageInfo;
    let tag = document.createElement(el)
    tag.innerText = cont;
    if (el == 'p') {
        tag.style.margin = '0px 5px';
        tag.style.padding = '0px 5px';
        tag.style.border = '1px solid black';
        tag.style.display = 'inline-block';
    }
    this.nul.appendChild(tag);
    if (pageInfo.pageNum == cont) tag.style.background = 'orange';
}


// 阻止页面默认选中
Pagination.prototype.select=function(){
    document.addEventListener('selectstart', function (e) {
        e.preventDefault();
    })
}


