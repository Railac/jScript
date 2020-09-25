//board.js

class Board {
    //필드 정의방법
    constructor(boardNo, title, content, writer) {
        this._boardNo = boardNo;
        this._title = title;
        this._content = content;
        this._writer = writer;
    }
    get boardNo() {
        return this._boardNo;
    }
    set boardNo(boardNo) {
        this._boardNo = boardNo;
    }
    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }
    get content() {
        return this._content;
    }
    set content(cotent) {
        this._content = content;
    }
    get writer() {
        return this._writer;
    }
    set writer(writer) {
        this._writer = writer;
    }
}


//DB 생성 ~_~ --------------------------------------------------------------
let boardDB = [];
boardDB.push(new Board(1, '자바스크립트', '웹언어입니다', '최재영'));//한개의 obj=value
boardDB.push(new Board(2, '자바', '컴파일러입니다', '김현동'));
boardDB.push(new Board(3, '오라클', '데이터베이스관리', '허성준'));

//title 생성
let titles = ['checkbox', 'boardNo', 'title', 'content', 'writer', '상세보기'];

//변수 선언
let table, tr, td, text, checkbox, btn;

//타이틀 테이블에 추가.(맨윗줄)
function createTitle() { //호출함수
    tr = document.createElement('tr'); //tr을 생성해서
    for (let field of titles) { //title배열의 값들을 하나식 루프시킨다.
            td = document.createElement('th'); //td 생성
            text = document.createTextNode(field); //text에 title배열의값 저장
            td.append(text); //td에 text값 넣기
            tr.append(td); //tr에 td 넣기
    }
    return tr;// 해당 tr(첫번째줄 리턴)
}


/////시작점
function getBoardList() { //board.html body가 load될때 getBoardList 출력
    table = document.createElement("table"); //table 생성
    table.setAttribute('border', '1'); //table 속성 border = 1
    table.setAttribute('id', 'tbl'); // table 속성 id 값 tbl
    table.append(createTitle()); //table에 추가한다- createTitle()함수(첫째줄에 타이틀 추가하는함수)


    //title에 맞는 값들 테이블에 출력
    boardDB.forEach(function (obj, idx) { //DB 루프돌림, db안에 값 3개들어가있음, obj=value;   idx=index;
        tr = document.createElement("tr"); //tr 생성(두번째줄)
        tr.setAttribute('id', obj.boardNo); //테이블의 투번째줄 속성-- id값을 obj값중에 boardNo를id로 지정
        table.append(tr); //table에 tr(두번째줄 추가)

        for (let field of titles) { //titles 의 배열만큼 루프 돌림, 첫번재줄에 출력되는 값들.
            td = document.createElement("td"); //td 생성(titles 배열만큼 생성됨)
            if (field == "checkbox") { //루프돌면서 titles 배열에 checkbox 의 checkbox 값이랑 동일할때 
                checkbox = document.createElement('input'); //input 생성
                checkbox.setAttribute('type', 'checkbox'); //input type은 checkbox, 체크박스생성
                // checkbox.onclick = function(){
                  

                // }
                td.append(checkbox); // 해당 체크박스조건에만족하는 td에 추가
            }else if(field == "상세보기"){  //루프 돌면서 titles배열에서 상세보기값 으로 돌때
                btn =document.createElement("button"); //버튼 생성
                btn.innerHTML = "상세보기"; //버튼의 텍스트는 상세보기
                td.append(btn); //해당 버튼 조건에 만족하는 td에 추가
                btn.onclick = showDetail; //이버튼을 클릭했을때 showDetail 함수 호출
                // btn.onclick = function(){
                //     showDetail();
                // }
            } 
            else {
                    //let titles = ['checkbox', 'boardNo', 'title', 'content', 'writer', '상세보기'];
                    //obj == new Board(1, '자바스크립트', '웹언어입니다', '최재영')
                    text = document.createTextNode(obj[field]); //boardDB 인덱스의 밸류값을 받아오는데 그 밸류값의 ?
                    td.append(text); //text를 td에 추가
            }
            tr.append(td); //tr에 td 추가
        }
        // table.append(tr); //table에 tr(두번째줄 추가)
    }); //end foreach
    

    //위에서 tr을 추가한 table을 main에 추가, main은 board.html 의 p태그 id값
    //여기까지가 DB에 있는값들을 table을만들어서 화면에 띠운것
    document.getElementById("main").append(table);


}//end getBoardList();  //기존 DB에 있는값 테이블에 저장


//데이터 입력 버튼, board.html 에 있는 "입력" 버튼 클릭시 호출되는 함수
function insertData(){
    //여기서 불러온 ID들은 board.html의 input text id값 불러온것,
    //그 id값들의 value 값을 변수에 저장.
    let boardNo = document.getElementById("boardNo").value;
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let writer = document.getElementById("writer").value;

    boardDB.push(new Board(boardNo, title, content, writer));

    let tbl = document.getElementById("tbl"); //tbl id값 갖고와서 tbl
    tr = document.createElement("tr"); //tr생성
    tr.setAttribute("id",boardNo);
    td = document.createElement("td"); //td  생성
    checkbox = document.createElement("input"); //input생성
    checkbox.setAttribute("type", "checkbox"); //input type은 checkbox
    td.append(checkbox); //td에 check박스 추가
    tr.append(td); //tr에 td추가

    td=document.createElement("td"); //새로운 td생성
    td.append(boardNo); //boardNo value 값 td에 추가
    tr.append(td);

    td=document.createElement("td"); //새로운 td생성
    td.append(title); //boardNo value 값 td에 추가
    tr.append(td);

    td=document.createElement("td"); //새로운 td생성
    td.append(content); //boardNo value 값 td에 추가
    tr.append(td);

    td=document.createElement("td"); //새로운 td생성
    td.append(writer); //boardNo value 값 td에 추가
    tr.append(td);

    td=document.createElement("td");
    btn =document.createElement("button");
    btn.innerHTML = "상세보기";
    btn.onclick = showDetail;
    td.append(btn);
    tr.append(td);

    tbl.append(tr);

    console.log(tbl);
}

function getBoard(id){
    let oneBoardNo;
    for(let board of boardDB){
        if(board.boardNo == id){
           oneBoard =  new Board(board.boardNo, board.title, board.content, board.writer)
            oneBoard = board;
        }
    }
    return oneBoard;
}

function showDetail(){
    let id = this.parentNode.parentNode.id
    let board=getBoard(id);
    document.getElementById("boardNo").value = board.boardNo;
    document.getElementById("title").value = board.title;
    document.getElementById("content").value = board.content;
    document.getElementById("writer").value = board.writer;
}