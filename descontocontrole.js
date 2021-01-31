function calcular() {
    
    var valorPlano = parseFloat(document.getElementById("valorPlano").value);

    var desconto1 = document.getElementById('a-descontoPorcentagem');
	var value1 = desconto1.options[desconto1.selectedIndex].value;

    var desconto2 = document.getElementById('b-descontoPorcentagem');
	var value2 = desconto2.options[desconto2.selectedIndex].value;

    var descontoReais1 = document.getElementById("a-descontoReais").value;

    var descontoReais2 = document.getElementById("b-descontoReais").value;

    var calc1 = value1 / 100;
    var calc2 = value2 / 100;
    
    var calc3 = valorPlano * calc1;
    var calc4 = valorPlano - calc3;
    console.log(calc4);

    var calc5 = -(((value1 / 100) * valorPlano) - valorPlano);
    var calc6 = -(((value2 / 100) * calc5) - calc5);
    console.log(calc5);
    console.log(calc6);

    var calcFinal = calc6 - descontoReais1 - descontoReais2;

    var calcFinalAgoraVai = (calcFinal).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
    var mostrar = document.getElementById("result");
    mostrar.innerHTML = calcFinalAgoraVai;

}

function gerarMemo1() {

    var valorPlano = parseFloat(document.getElementById("valorPlano").value);

    var desconto1 = document.getElementById('a-descontoPorcentagem');
	var value1 = desconto1.options[desconto1.selectedIndex].value;

    var desconto2 = document.getElementById('b-descontoPorcentagem');
	var value2 = desconto2.options[desconto2.selectedIndex].value;

    var descontoReais1 = document.getElementById("a-descontoReais").value;

    var descontoReais2 = document.getElementById("b-descontoReais").value;

    var retido1 = document.querySelector('input[name="retido"]:checked').value;

    var calc1 = value1 / 100;
    var calc2 = value2 / 100;
    
    var calc3 = valorPlano * calc1;
    var calc4 = valorPlano - calc3;
    console.log(calc4);

    var calc5 = -(((value1 / 100) * valorPlano) - valorPlano);
    var calc6 = -(((value2 / 100) * calc5) - calc5);
    console.log(calc5);
    console.log(calc6);

    var calcFinal = calc6 - descontoReais1 - descontoReais2;

    var calcFinalAgoraVai = (calcFinal).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });

    
    if (retido1 == "argumentação") {
        document.getElementById("resultadoMemo").value = `Cliente retido com argumentação sobre XXXXXXXXXXXXXXX (Ex: Multa, vencimento, ciclo)`;
    }

    else {
        document.getElementById("resultadoMemo").value = `Cliente retido com oferta de ${value1}% + ${value2}% + R$ ${descontoReais1} + R$ ${descontoReais1} do débito automático (caso tenha), ficando no valor de ${calcFinalAgoraVai}, cliente ciente da fidelidade por 12 meses.`;
    }

    document.getElementById("resultadoMemo").style.display = "block";
    document.getElementById("resultadoMemo").select();
    document.execCommand('copy');
    alert("MEMORANDO COPIADO");
}