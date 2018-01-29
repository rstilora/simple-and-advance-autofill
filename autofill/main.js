// auther Rs Rathore Ui designer 
// Comapny name Ways and Means Technology
// Date of created 1/11/2017

var loadList = [];
var typeText;
var selectOpt = '';
var gaya = false;

// load option list by class Name 'rs_autocomplete'
$(".rs_autocomplete").each(function () {
    var opt = '';

    $(this).find('option').each(function () {

        opt = $(this).text();
        loadList.push(opt);

    });
});


// hide select box and show elements
$(".rs_autocomplete").hide();
$(".rs_autocomplete").wrap('<div class="autofill_main"></div>');
$(".autofill_main").append('<input id="typ_citytext" type="text" onkeyup="searchFromList();" placeholder="Choose Option" />');
$("#typ_citytext").focus(function () {
    if (document.getElementById('datalist')) {
        console.log('this record already exists');

    } else {

        $(".autofill_main").append("<ul class='datalist' id='datalist'></ul>");
    }


});


// function for search data form loadList( list of options)
function searchFromList() {

    //get value from input
    typeText = $("#typ_citytext").val();

    if (typeText != "") {
        $(".datalist li").remove();
        // create list of related options from  loadList( list of options)

        gaya = false;


        for (var i = 0; i < loadList.length; i++) {

            var bar = typeText.toLowerCase();

            if (loadList[i].toLowerCase().indexOf(bar) > -1) {

                // macth caractor show highlight
                var arrayCurent = loadList[i].split('');
                searchOption = '';
                console.log(arrayCurent)
                for (var cT = 0; cT < arrayCurent.length; cT++) {

                    if (bar.indexOf(arrayCurent[cT].toLowerCase()) > -1) {
                        searchOption += "<i>" + arrayCurent[cT] + "</i>"

                    } else {
                        searchOption += arrayCurent[cT]
                    }

                }

                // show list 
                $(".datalist").append("<li tabindex='-1' id='list" + i + "'>" + searchOption + "</li>");

                selectOp();

                // check not match
                gaya = true;

            }

        }

        // check not match
        if (gaya == false) {
            $(".datalist").append("<li tabindex='-1' id='list" + i + "'> data not found</li>");

        }

    }


}

//console.log(JSON.stringify(loadList));

// onkey up and down select options
$(document).on("keydown", ".datalist li", function () {
    if (event.keyCode === 40) {
        console.log(event.keyCode)
        var currentNextLi = '.datalist li:eq(' + ($(this).index() + 1) + ')';
        $(currentNextLi).focus();
        selectOpt = $(currentNextLi).text()
        $("#typ_citytext").val(selectOpt);
        addSlect();


    } else if (event.keyCode === 38) {

        var currentNextLi = '.datalist li:eq(' + ($(this).index() - 1) + ')';
        $(currentNextLi).focus();
        selectOpt = $(currentNextLi).text()
        $("#typ_citytext").val(selectOpt);
        addSlect();



    } else if (event.keyCode === 27) {

        $(".datalist").remove();

    } else if (event.keyCode === 13) {

        $(".datalist").remove();

    }
    else {

        $("#typ_citytext").focus();

    }


})

$(document).on('keydown', '#typ_citytext', function () {
    if (event.keyCode == 40) {

        $('.datalist li:eq(0)').focus();
        addSlect();
    }
});

// on list click select options
function selectOp() {
    $(".datalist li").click(function () {
        electOpt = $(this).text();
        $("#typ_citytext").val(selectOpt);
        addSlect();

        $(".datalist").remove();

    });
}

// send value to hide select box
function addSlect() {

    var cs = ".rs_autocomplete option:nth-child(" + (loadList.indexOf(selectOpt) + 1) + ")";

    $('.rs_autocomplete option').removeAttr("selected");
    $(cs).attr("selected", "selected");
}