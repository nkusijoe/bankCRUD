let bankAccounts = [];

function getAllBankAccounts() {
    return bankAccounts;
}

function getOneBankAccount(id) {
    for(let account of bankAccounts) {
        if(account.id == id) {
            return account;
        }
    }
    return false;
}

function createBankAccount(account) {
    bankAccounts.push(account);
}

function updateBankAccount(id,newBalance) {
    console.log(id,newBalance);
    for(let account of bankAccounts) {
        if(account.id == id) {
            account.balance += newBalance;
            return true;
        }
    }
    return false;
}

function deleteBankAccount(id) {
    let found = false;
    for(let account of bankAccounts) {
        if(account.id == id) {
            found = true;
        }
    }
    if(bankAccounts.length>0 && found) {
        bankAccounts = bankAccounts.filter(account => account.id != id);
        return true;
    }
    return found;
}

module.exports = {getAllBankAccounts, getOneBankAccount,createBankAccount,updateBankAccount,deleteBankAccount};