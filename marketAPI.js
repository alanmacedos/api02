// Desafio 02
// Promoção de supermercado

// Um supermercado deseja automatizar sua política de descontos.

// Clientes que realizarem compras a partir de R$ 150 recebem 5 % de desconto.
// Compras a partir de R$ 300 recebem 10 %, e compras a partir de R$ 500 recebem 15 %.

// O sistema deverá determinar o valor final da compra e
// informar ao cliente quanto economizou.
// A gerência exige que nenhum valor inválido seja aceito.

import { save, edit, removeData, searchAll } from './firebase/crud.js';

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/desconto', async (req, res) => {
  
    let { compra } = req.body ?? {};
    let desconto = null;

    if (typeof compra !== "number" || !Number.isFinite(compra)) {

        return res.status(400).json({
            erro: "O valor deve ser em números com no max 2 n° depois da vírgula.",
        });
    }

    if (compra >= 500) {

        desconto = compra * 0.15;
        compra = compra - desconto;

    }
    else if (compra >= 300) {

        desconto = compra * 0.10;
        compra = compra - desconto;

    } else {

        desconto = compra * 0.05;
        compra = compra - desconto;
    }

    res.json({
        desconto: desconto,
        valorCompra: compra,
    });

    await save(valorCompra, desconto);
});

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});