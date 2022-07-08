const express = require("express");
const {getAllBankAccounts, getOneBankAccount,createBankAccount,updateBankAccount,deleteBankAccount} = require("./bankAccounts");
const account = require("./bankAccount");
const app = express();

app.use(express.json());

app.post('/account', (request,response)=> {
    try {
        const {id,name,age} = request.body;
        if(!id) throw new Error("please insert account user's id.");
        if(!name) throw new Error("please insert account user's name.");
        if(!age) throw new Error("please insert account user's age");
        
        let newAccount = new account(id,name,age); 

        createBankAccount(newAccount);
        response.status(200).json({Message: "bank account is created successfully"});
    }catch(error) {
        response.status(401).json({
            Error: error.message
        });
    }
});

app.get('/account', (request,response) => {
    try {
        let result = getAllBankAccounts();
        if(!result) throw new Error("no accounts found.");
        response.status(200).json(result);
    }catch(error) {
        response.status(401).json({
            Error: error.message
        });
    }
});

app.get('/account/:id', (request,response) => {
    try {
        let id = request.params.id;
        if(!id) throw new Error("Please provide id.");
        let result = getOneBankAccount(Number(id));
        if(!result) throw new Error("No account found.");
        response.status(200).json(result);
    }catch(error) {
        response.status(401).json({
            Error: error.message
        });
    }
});

app.patch('/account',(request,response)=> {
    try {
        const {id, balance} = request.body;
        if(!id) throw new Error("Please provide id.");
        if(!balance) throw new Error("Please provide balance");
        let result = updateBankAccount(id,balance);
        if(!result) throw new Error("Account not found");
        response.status(200).json({Message: "Updated account balance"});
    }catch(error) {
        response.status(401).json({
            Error: error.message
        });
    }
});

app.delete('/account',(request,response)=> {
    try {
        const {id} = request.body;
        if(!id) throw new Error("Please provide id.");
        let result = deleteBankAccount(id);
        if(!result) throw new Error("Account not found");
        response.status(200).json({Message: "Deleted account"});
    }catch(error) {
        response.status(401).json({
            Error: error.message
        });
    }
});

app.listen(2020, () => {
    console.log("server running on port:"+2020);
});