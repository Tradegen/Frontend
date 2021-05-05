"use strict";

/**
 * Example JavaScript code that interacts with the page and Web3 wallets
 */

 // Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;

// Web3modal instance
var web3Modal

// Chosen wallet provider given by the dialog window
var provider;


// Address of the selected account
var selectedAccount;

var web3;


/**
 * Setup the orchestra
 */
function init() {

  console.log("Initializing example");
  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log("Fortmatic is", Fortmatic);
  console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        // Mikko's test key - don't copy as your mileage may vary
        infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
      }
    },

    fortmatic: {
      package: Fortmatic,
      options: {
        // Mikko's TESTNET api key
        key: "pk_test_391E26A3B43A3350"
      }
    }
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  console.log("Web3Modal instance is", web3Modal);

  if (window.ethereum)
  {
    web3 = new Web3(window.ethereum);
    provider = window.ethereum;
  }
  else if (window.web3)
  {
    web3 = new Web3(window.web3.currentProvider);
    provider = window.web3.currentProvider;
  };

  fetchAccountData();
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {

  /*if (typeof web3 == "undefined")
  {
    // Get a Web3 instance for the wallet
    web3 = new Web3(provider);
  }*/

  console.log("Web3 instance is", web3);

  // Get connected chain id from Ethereum node
  const chainId = await web3.eth.getChainId();
  // Load chain information over an HTTP API
  const chainData = evmChains.getChain(chainId);
  //document.querySelector("#network-name").textContent = chainData.name;
  console.log("the chain is: " + chainData.name);

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  let humanFriendlyBalance = 0;

  // MetaMask does not give you all accounts, only the selected account
  console.log("Got accounts", accounts);
  selectedAccount = accounts[0];

  console.log("the selected account is: " + selectedAccount);

  // Go through all accounts and get their ETH balance
  const rowResolvers = accounts.map(async (address) => {
    const balance = await web3.eth.getBalance(address);
    // ethBalance is a BigNumber instance
    // https://github.com/indutny/bn.js/
    const ethBalance = web3.utils.fromWei(balance, "ether");
    humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);

    console.log("the address is: " + address);
    console.log("the balance is: " + humanFriendlyBalance);
  });

  // Because rendering account does its own RPC commucation
  // with Ethereum node, we do not want to display any results
  // until data for all accounts is loaded
  await Promise.all(rowResolvers);

  if (document.getElementById("headerWalletAddress"))
  {
    document.getElementById("headerWalletAddress").innerText = selectedAccount.substring(0, 8) + "...";
  }

  if (document.getElementById("otherBalance"))
  {
    document.getElementById("otherBalance").innerText = humanFriendlyBalance;
  }

  if (document.getElementById("settingsAddress"))
  {
    document.getElementById("settingsAddress").innerText = selectedAccount;
  }
}



/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {

  // Disable button while UI is loading.
  // fetchAccountData() will take a while as it communicates
  // with Ethereum node via JSON-RPC and loads chain data
  // over an API call.
  await fetchAccountData(provider);
}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
    const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];
    window.location.href = "/login/" + encodeURIComponent(selectedAccount); 
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });

  await refreshAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  if(provider.close) {
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null;

  window.location.href = "/logout";
}


/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
  init();
  if (document.getElementById("enterAppButton"))
  {
    document.getElementById("enterAppButton").addEventListener("click", onConnect);
  }

  if (document.getElementById("logout"))
  {
    document.getElementById("logout").addEventListener("click", onDisconnect);
    document.getElementById("logout").addEventListener("mouseover", function() {
      document.getElementById("logout").style.cursor = "pointer";
    });
  }
});