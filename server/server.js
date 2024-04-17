// @ts-check
import express from "express"
import fs from "node:fs"

const expressApp = express()

expressApp.use(express.json())

expressApp.post("/save", async (req, res) => {
  // console.info(req.body)
  let url = req.body["url"]
  if (url.includes("?")) {
    url = url.split("?")[0]
  }
  const img = await fetch(url)
  const data = await img.arrayBuffer()
  const ext = img.headers.get("content-type")?.split("/")[1] ?? "idk"
  // console.log(img.headers)
  fs.writeFileSync(`../pins/${Date.now()}.${ext}`, Buffer.from(data))
  res.status(200)
  res.end()
})

expressApp.listen(7777)
