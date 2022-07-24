### elven-tools-collection-owners-csv

The purpose of this script is to be able to filter long-term hodlers of a particular NFT collection.

The logic behind that is quite simple. You would need to use `elven-tools collection-nft-owners` a couple of times over time and prepare JSON files. Let's say you will do the snapshots once a day through one week, so you should have 7 JSON files with lists of owners. Then, you can put them in the `data/input` folder and run the script. It will output only those addresses that appear on each list. This will be proof that the owners kept the NFT at least for seven days. You don't have to inform anyone when the snapshots will be done. You can even do them randomly. It depends on your needs.

#### Usage:
1. Clone the repository
2. run `npm install`
2. Put your `nft-collection-owners.json` files in the `data/input` folder (there are already examples, so remove them first). Each file should have a different name. Of course, you could add the number or date. Like nft-collection-owners-2022-08-11.json, but in fact, the file name isn't important.
3. Run the script by `npm run generate` (in the root folder)
4. You will get the final output.json file in the `data` directory

---

**Check how to use the:** [elven-tools collection-nft-owners](https://www.elven.tools/docs/recipes.html#how-to-get-owners-addresses-using-the-collection-ticker)
