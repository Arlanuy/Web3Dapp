const {Web3} = require("web3");
const provider = "https://mainnet.infura.io/v3/b7848cc5f1d049bdbc8f01aa72c52ff3";
const web3 = new Web3(provider);
const address = '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8'
const contractAddress = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE";
const accountAddress = "0xf3B0073E3a7F747C7A38B36B805247B222C302A3";
var balanceLocal;
var accountCreatedObject;
var contractName;

const createContract = async() => {
    const abi = await extractAbi();
    const contract = new web3.eth.Contract(abi, contractAddress);
    //console.log(contract);
    setTimeout(() => {
       contractName = contract.methods.name().call().then(console.log)
        console.log(contractName);
        console.log( contract.methods.totalSupply().call().then(console.log))
        console.log(contract.methods.balanceOf(accountAddress).call().then(console.log))
    }, 1000)
   
}

const createAccount = () => {
    accountCreatedObject = web3.eth.accounts.create()
    //console.log(accountCreatedObject);
}

const getBalance = async () => {
    await web3.eth.getBalance(address).then(
        (balance) => {
                //console.log(balance)
                balanceLocal = web3.utils.fromWei(balance, 'ether')
        }
    );
}

const extractAbi = async() => {
    var abi;
    await fetch("http://127.0.0.1:8080/contractAbi.json").then((res) => abi =res.json());
    return abi;
}



createAccount();
getBalance();
createContract();





