const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const app = express();
const PORT = 4001;

app.use(bodyParser.json());

// Rota para listar todos os itens
app.get('/items', async (req, res) => {
    try {
        const data = await fs.readFile('data.json');
        const items = JSON.parse(data);
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar itens.' });
    }
});

// Rota para buscar um item por ID
app.get('/items/:id', async (req, res) => {
    try {
        const data = await fs.readFile('data.json');
        const items = JSON.parse(data);
        const item = items.find(item => item.id === parseInt(req.params.id));
        if (!item) {
            return res.status(404).json({ message: 'Item não encontrado.' });
        }
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar o item.' });
    }
});

// Rota para adicionar um novo item
app.post('/items', async (req, res) => {
    try {
        const data = await fs.readFile('data.json');
        const items = JSON.parse(data);
        const newItem = { id: items.length + 1, ...req.body };
        items.push(newItem);
        await fs.writeFile('data.json', JSON.stringify(items, null, 2));
        res.status(201).json(newItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao adicionar o item.' });
    }
});

// Rota para atualizar um item por ID
app.put('/items/:id', async (req, res) => {
    try {
        const data = await fs.readFile('data.json');
        let items = JSON.parse(data);
        const index = items.findIndex(item => item.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ message: 'Item não encontrado.' });
        }
        items[index] = { id: parseInt(req.params.id), ...req.body };
        await fs.writeFile('data.json', JSON.stringify(items, null, 2));
        res.json(items[index]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar o item.' });
    }
});

// Rota para deletar um item por ID
app.delete('/items/:id', async (req, res) => {
    try {
        const data = await fs.readFile('data.json');
        let items = JSON.parse(data);
        const index = items.findIndex(item => item.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ message: 'Item não encontrado.' });
        }
        const deletedItem = items.splice(index, 1);
        await fs.writeFile('data.json', JSON.stringify(items, null, 2));
        res.json({ message: 'Item deletado.', deletedItem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao deletar o item.' });
    }
});

// Start Server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});