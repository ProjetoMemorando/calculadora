function calcularProRata() {

    var valorPlanoCheio = document.getElementById("valor_Plano").value;
    console.log(valorPlanoCheio);

    var diasUtilizado = document.getElementById("dias_utilizado").value;
    console.log(diasUtilizado);

    var conta1 = valorPlanoCheio / 30;
    console.log(conta1);

    var conta2 = conta1 * diasUtilizado;
    console.log(conta2);

    var proRata = valorPlanoCheio - conta2;
    console.log(proRata);

    var valorConvert = (proRata).toLocaleString('pt-BR', { minimumFractionDigits: 3, style: 'currency', currency: 'BRL' });

    
    document.getElementById("resultado_proprocional").value = `Ajuste de R$ ${valorConvert}`;

    // Formato BRL + 2 casas decimais
    // R$ 1.234,50
    // (1234.5).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
}

// function calcular2() {

//     const valorPlano = document.getElementById("valorPlano2").value;
//     console.log(valorPlano);

//     const dataValue1 = document.getElementById("data1").value;
//     console.log(dataValue1);

//     const dataValue2 = document.getElementById("data2").value;
//     console.log(dataValue2);

//     const data1 = new Date(dataValue1); // Data de início
//     const data2 = new Date(dataValue2); // Data fim
//     const diff = Math.abs(data1.getTime() - data2.getTime()); // Subtrai uma data pela outra
//     const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo)
    
//     // Mostra a diferença em dias
//     console.log('Até agora já se passaram ' + days + ' dias');

//     const valorDia = valorPlano / 30;
//     console.log(valorDia);

//     const valorDia2 = (valorDia).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });

//     var mostrar = document.getElementById("valorDia2");
//     mostrar.innerHTML = valorDia2;

//     var calc1 = valorDia * days;
//     console.log(calc1);

//     var valorCobFat = document.getElementById("valorCobradoPlano").value;

//     var calc2 = valorCobFat - calc1;

//     const valorConvert1 = (calc1).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
//     const valorConvert2 = (calc2).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });

//     var mostrar2 = document.getElementById("result2");
//     mostrar2.innerHTML = 'A pagar: ' + valorConvert1 + '&nbsp; - &nbsp;' + ' Ajuste de: ' + valorConvert2;
    
// }

// ### CAPTURAR DATA E CALCULAR EM DIAS ### //
// const now = new Date(); // Data de hoje
// const past = new Date('2014-07-07'); // Outra data no passado
// const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
// const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).

// // Mostra a diferença em dias
// console.log('Entre 07/07/2014 até agora já se passaram ' + days + ' dias');

// Formato BRL + 2 casas decimais
// R$ 1.234,50
// (1234.5).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
