const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const valorInicial = parseFloat(document.querySelector("#valor-inicial").value.replace(",", ".")) || 0
    const aporteMensal = parseFloat(document.querySelector("#aporte-mensal").value.replace(",", ".")) || 0
    const jurosInput = parseFloat(document.querySelector("#juros").value.replace(",", ".")) / 100
    const periodoInput = parseFloat(document.querySelector("#periodo").value.replace(",", ".")) || 1
    const tipoJuros = document.querySelector("#tipo-juros").value
    const tipoPeriodo = document.querySelector("#tipo-periodo").value

    let jurosMensal = jurosInput
    if (tipoJuros === "anual") {
        jurosMensal = Math.pow(1 + jurosInput, 1 / 12) - 1
    }

    let meses = periodoInput
    if (tipoPeriodo === "anual") {
        meses = periodoInput * 12
    }

    let valorFinal = valorInicial * Math.pow(1 + jurosMensal, meses)
    if (aporteMensal > 0) {
        valorFinal += aporteMensal * ((Math.pow(1 + jurosMensal, meses) - 1) / jurosMensal)
    }

    valorFinal = Math.round(valorFinal * 100) / 100
    const totalInvestido = Math.round((valorInicial + aporteMensal * meses) * 100) / 100
    const totalJuros = Math.round((valorFinal - totalInvestido) * 100) / 100

    document.querySelector(".Valor-Final span").textContent = valorFinal.toFixed(2).replace(".", ",")
    document.querySelector(".total-investido span").textContent = totalInvestido.toFixed(2).replace(".", ",")
    document.querySelector(".total-juros span").textContent = totalJuros.toFixed(2).replace(".", ",")

    let saldo = valorInicial
    let tabelaHTML = `<table>
        <tr>
            <th>Mês</th>
            <th>Aporte</th>
            <th>Juros</th>
            <th>Saldo</th>
        </tr>`

    for (let m = 1; m <= meses; m++) {
        const jurosMes = saldo * jurosMensal
        saldo += jurosMes + aporteMensal
        saldo = Math.round(saldo * 100) / 100

        tabelaHTML += `<tr>
            <td>${m}</td>
            <td>R$ ${aporteMensal.toFixed(2).replace(".", ",")}</td>
            <td>R$ ${jurosMes.toFixed(2).replace(".", ",")}</td>
            <td>R$ ${saldo.toFixed(2).replace(".", ",")}</td>
        </tr>`
    }

    tabelaHTML += `</table>`

    const container = document.querySelector("#tabela-meses")
    if (!container) {
        const sec = document.createElement("section")
        sec.id = "tabela-meses"
        sec.innerHTML = tabelaHTML
        document.body.appendChild(sec)
    } else {
        container.innerHTML = tabelaHTML
    }
})

document.querySelector("#limpar").addEventListener("click", (e) => {
    e.preventDefault()

    document.querySelectorAll("input").forEach(input => input.value = "")
    document.querySelectorAll("span").forEach(span => span.textContent = "")
})
