function count_all_time() {
    var operator = $("#underlist-people").val();

    var form1_select = $("#first-underlist-select").val();
    var form1_input = $("#first-underlist-input").val();
    var form2_select = $("#second-underlist-select").val();
    var form2_input = $("#second-underlist-input").val();
    var form3_select = $("#third-underlist-select").val();
    var form3_input = $("#third-underlist-input").val();
    var form4_select = $("#forth-underlist-select").val();
    var form4_input = $("#forth-underlist-input").val();

    var form5_select = $("#fifth-underlist-select").val();
    var form5_input = $("#fifth-underlist-input").val();

    var total_time = form1_input * form1_select + form2_input * form2_select + form3_input * form3_select + form4_input * form4_select;
    var countdown_time = form5_input * form5_select;

    save_operator_info(operator,total_time,countdown_time);

}

function save_operator_info(operator,total_time,countdown_time){
    var operator_infos = JSON.parse(localStorage.getItem('operator_infos')) || [];
    var operator_info = {};
    operator_info["operator"] = operator;
    operator_info["total_time"] = total_time;
    operator_info["countdown_time"] = countdown_time;

    var is_find_operator = _.find(operator_infos,function(operator_info){
        return operator_info.operator == operator;
    });

    if(is_find_operator){
        _.map(operator_infos,function(opera){
            if(opera.operator==operator){
                opera.total_time = total_time;
                opera.countdown_time = countdown_time;
            }
            return  ;
        })
    }else{
        operator_infos.push(operator_info);
    }

    localStorage.setItem("operator_infos",JSON.stringify(operator_infos));
}
