//Открытие и закрытие popup-header элемента
let openPopupTwo = document.getElementsByClassName("popup-header");
function addPopupTwo() {
    openPopupTwo[0].classList.add("active");
    document.body.classList.add("scroll-none");
}
function closePopupTwo() {
    openPopupTwo[0].classList.remove("active");
    document.body.classList.remove("scroll-none");
}


// Открытие и закрытие cell-popup элемента в таблице
let openPopup = document.getElementsByClassName("cell-popup");
function addPopup() {
    openPopup[0].classList.add("active");
    document.body.classList.add("scroll-none");
}
function closePopup() {
    openPopup[0].classList.remove("active");
    document.body.classList.remove("scroll-none");
}


var Cal = function (divId) {
    //Сохраняем идентификатор div
    this.divId = divId;
    // Дни недели с понедельника
    this.DaysOfWeek = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье'
    ];
    // Месяцы начиная с января
    this.Months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    //Устанавливаем текущий месяц, год
    var d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
};



// Переход к следующему месяцу
Cal.prototype.nextMonth = function () {
    if (this.currMonth == 11) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
    }
    else {
        this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
};

// Переход к предыдущему месяцу
Cal.prototype.previousMonth = function () {
    if (this.currMonth == 0) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
    }
    else {
        this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
};

// Показать текущий месяц
Cal.prototype.showcurr = function () {
    this.showMonth(this.currYear, this.currMonth);
};

// Показать месяц (год, месяц)
Cal.prototype.showMonth = function (y, m) {

    html += '<tr class="text">';
    html += this.Months[m] + y;
    html += '/tr';
}


Cal.prototype.showMonth = function (y, m) {
    var d = new Date()
        // Первый день недели в выбранном месяце 
        , firstDayOfMonth = new Date(y, m, 7).getDay()
        // Последний день выбранного месяца
        , lastDateOfMonth = new Date(y, m + 1, 0).getDate()
        // Последний день предыдущего месяца
        , lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
    var html = '<table>';


    // Запись выбранного месяца и года
    let date = this.Months[m] + " " + y;

    const test = document.getElementById("text");
    test.innerHTML = date;

    // Записываем дни
    var i = 1;
    do {
        var dow = new Date(y, m, i).getDay();
        // Начать новую строку в понедельник
        if (dow == 1) {
            html += '<tr id="tr">';
        }
        // Если первый день недели не понедельник показать последние дни предыдущего месяца
        else if (i == 1) {
            html += '<tr id="tr">';
            var k = lastDayOfLastMonth - firstDayOfMonth + 1;
            for (var j = 0; j < firstDayOfMonth; j++) {
                html += '<td id="" onclick="addPopup()" class="not-current">' + k + '</td>';
                k++;
            }
        }
        // Записываем текущий день в цикл
        var chk = new Date();
        var chkY = chk.getFullYear();
        var chkM = chk.getMonth();
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            html += '<td onclick="addPopup()" class="today">' + i + '</td>';
        } else {
            html += '<td onclick="addPopup()" class="normal">' + i + '</td>';
        }
        // закрыть строку в воскресенье
        if (dow == 0) {
            html += '</tr>';
        }
        // Если последний день месяца не воскресенье, показать первые дни следующего месяца
        else if (i == lastDateOfMonth) {
            var k = 1;
            for (dow; dow < 7; dow++) {
                html += '<td onclick="addPopup()" class="not-current">' + k + '</td>';
                k++;
            }
        }
        i++;
    } while (i <= lastDateOfMonth);
    // Конец таблицы
    html += '</table>';
    // Записываем HTML в div
    document.getElementById(this.divId).innerHTML = html;

    // заголовок дней недели

    for (var i = 0; i < this.DaysOfWeek.length; i++) {

        let td = document.querySelectorAll("td");
        td[i].innerHTML = this.DaysOfWeek[i] + ', ' + document.querySelectorAll("td")[i].textContent;
    }

};







// При загрузке окна
window.onload = function () {
    // Начать календарь
    var c = new Cal("divCal");
    c.showcurr();
    // Привязываем кнопки «Следующий» и «Предыдущий»
    getId('btnNext').onclick = function () {
        c.nextMonth();
    };
    getId('btnPrev').onclick = function () {
        c.previousMonth();
    };
}

// Получить элемент по id
function getId(id) {
    return document.getElementById(id);
}



