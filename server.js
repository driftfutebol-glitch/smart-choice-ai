const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// A chave será configurada direto no Render por segurança
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
    try {
        const { mensagem } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `Você é o vendedor VIP da Smart Choice Vendas (Tude Bastos, Praia Grande). 
        Seja luxuoso e educado. Nunca dê preços, mande para o WhatsApp (66) 8433-0286. 
        Pergunta do cliente: ${mensagem}`;

        const result = await model.generateContent(prompt);
        res.json({ resposta: result.response.text() });
    } catch (error) {
        res.status(500).json({ resposta: "Erro no sistema. Chame no WhatsApp!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor Online"));
