// Desafio 02
// Promoção de supermercado

// Um supermercado deseja automatizar sua política de descontos.

// Clientes que realizarem compras a partir de R$ 150 recebem 5 % de desconto.
// Compras a partir de R$ 300 recebem 10 %, e compras a partir de R$ 500 recebem 15 %.

// O sistema deverá determinar o valor final da compra e
// informar ao cliente quanto economizou.
// A gerência exige que nenhum valor inválido seja aceito.

import { save, edit, removeData, searchAll } from './firebase/crud.js';
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/desconto', async (req, res) => {

    let { compra } = req.body ?? {};

    if (typeof compra !== "number" || !Number.isFinite(compra)) {
        return res.status(400).json({
            erro: "O valor deve ser numérico, com no máximo 2 casas decimais."
        });
    }
    
    const valorOriginal = compra;
    let desconto = 0;
    
    if (valorOriginal >= 500) {
        desconto = valorOriginal * 0.15;
    
    } else if (valorOriginal >= 300) {
        desconto = valorOriginal * 0.10;
    
    } else if (valorOriginal >= 150) {
        desconto = valorOriginal * 0.05;
    }
    
    const valorFinal = valorOriginal - desconto;
    
    await save(valorOriginal, desconto);
    
    return res.json({
        valorOriginal,
        desconto,
        valorFinal
    });

});

app.listen(PORT, () => {
    console.log(`Servidor em http://localhost:${PORT}`);
});