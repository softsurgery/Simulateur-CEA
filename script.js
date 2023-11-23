
function calc_val2(revenu,situation,enf_en_charge,par_a_charge,enf_infirme,enf_sans_bourse){
    if(situation=='M') revenu -= 300;

    if (par_a_charge==1){
        if (0.05*revenu < 450) revenu -= 0.05*revenu
        else revenu -= 450;
    } else if (par_a_charge==2){
        if (0.05*revenu < 900) revenu -= 0.05*revenu
        else revenu -= 900;
    }

    revenu -= enf_infirme*2000;

    if (!enf_en_charge!="4+") revenu-=Number(enf_en_charge)*100;
    else revenu-=400;

    if (!enf_sans_bourse!="4+") revenu-=Number(enf_sans_bourse)*1000;
    else revenu-=4000;  
    
    return revenu;
}



function calc_val3(revenu_net){
    if (revenu_net<=5000) return revenu_net*0.005;
    else if (revenu_net <= 20000) return (revenu_net - 5000.001)*0.265 + (5000)*0.005;
    else if (revenu_net <= 30000) return (revenu_net - 20000.001)*0.285 + (14999.999)*0.265 + (5000)*0.005; 
    else if (revenu_net <= 50000) return (revenu_net - 30000.001)*0.325 + (9999.999)*0.285 + (14999.999)*0.265 + (5000)*0.005; 
    else if (revenu_net > 50000)  return (revenu_net - 50000.001)*0.355 + (19999.999)*0.325 + (9999.999)*0.285 + (14999.999)*0.265 + (5000)*0.005; 
}


function run(){
    let revenu = document.getElementById("revenu");
    let montant_op = document.getElementById("montant_op");

    if(Number(montant_op.value) > Number(revenu.value) || Number(montant_op.value) > 100000 ) {
        montant_op.style.border = "3px solid red";
    }
    else montant_op.style = revenu.style;

    let situation = document.getElementById("situation");
    let situation_value = situation.options[situation.selectedIndex].value;
    let enf_en_charge = document.getElementById("enf_en_charge");
    let enf_en_charge_value = enf_en_charge.options[enf_en_charge.selectedIndex].value;
    let par_a_charge = document.getElementById("par_a_charge");
    let par_a_charge_value = par_a_charge.options[par_a_charge.selectedIndex].value;
    let enf_infirme = document.getElementById("enf_infirme");
    let enf_sans_bourse = document.getElementById("enf_sans_bourse");
    let enf_sans_bourse_value = enf_en_charge.options[enf_sans_bourse.selectedIndex].value;
    //out
    let val1 = document.getElementById("val1");
    let val2 = document.getElementById("val2");
    let val3 = document.getElementById("val3");
    let val4 = document.getElementById("val4");
    let val5 = document.getElementById("val5");
    let val6 = document.getElementById("val6");
    let val7 = document.getElementById("val7");

    val2.value = calc_val2(Number(revenu.value),situation.value,enf_en_charge.value,Number(par_a_charge.value),Number(enf_infirme.value),enf_sans_bourse.value).toFixed(3); 
    val3.value = calc_val3(val2.value).toFixed(3);
    val4.value = calc_val3(Number(val2.value)-Number(montant_op.value)).toFixed(3);
    val5.value = (Number(val3.value) - Number(val4.value)).toFixed(3);
    val6.value = (Number(val5.value)/12).toFixed(3);
    val7.value = (100 - (Number(val4.value) / Number(val3.value)) * 100).toFixed(1);

    //aproximate 
    let montant55 = 0
    let apres55 = calc_val3(Number(val2.value)-Number(montant55));
    let gain55 = (100 - (apres55 / Number(val3.value)) * 100);
    let plus = val2.value/500;
    while (gain55<54.9){
        montant55 +=plus;
        apres55 = calc_val3(Number(val2.value)-Number(montant55));
        gain55 = (100 - (apres55 / Number(val3.value)) * 100);
    }
    val1.value = montant55.toFixed(3);
    if (Number(val1.value) >= 100000) val1.value = 100000;

    val1.value += " DT"; 
    val2.value += " DT"; 
    val3.value += " DT"; 
    val4.value += " DT"; 
    val5.value += " DT"; 
    val6.value += " DT"; 
    val7.value += "%"; 
    return false;
}