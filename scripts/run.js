const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Jack", "Keanu", "The Rock"], // Names
    [
      "QmYrcgBkdekL52kVwdsWSrJV7WQZdUQeiG8NzcsNJgctsQ", // Images
      "QmfTNmkfPDruYTb632XWmBKChMMM3pDuvtrHP7idz85bnT",
      "QmTHi5cAoZq7YouMB2Syzh5NKxT64sfs1NR4p62PTGRqcm",
    ],
    [250, 300, 1000], // HP values
    [200, 150, 500], // Attack damage values
    "Clerk", // Boss name
    "QmVDQhXsqqgf8HW2GoAAtbFJXb7Y7WUFRPVvJq3UDyz9Yb", // Boss image
    10000, // Boss hp
    50 // Boss attack damage
  );
  await gameContract.deployed();
  
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  console.log("Done!");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();