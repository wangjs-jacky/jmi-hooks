import OSS from "ali-oss";
import { createReadStream } from "fs";
import { resolve } from "path";
import readdirp from "readdirp";
import PQueue from "p-queue";

const queue = new PQueue({ concurrency: 10 });

const client = new OSS({
  /* cdn 缓存地址 */
  region: "oss-cn-shanghai",
  accessKeyId: process.env.ACCESS_KEY_ID,
  accessKeySecret: process.env.ACCESS_KEY_SECRET,
  /* bucket */
  bucket: "jmi-hooks",
  secure: true,
});

async function isExistObject(objectName) {
  try {
    /* 使用 OSS 的 head 去检验资源 */
    await client.head(objectName);
  } catch (error) {
    return false;
  }
}

async function uploadFile(objectName, withHash = false) {
  const file = resolve("./docs/.vuepress/dist", objectName);
  /* 如果路径路径不带 hash 值，则直接重新上传 */
  const exist = withHash ? await isExistObject(objectName) : false;
  if (!exist) {
    const cacheControl = withHash ? "max-age=31536000" : "no-cache";
    /* 使用 Stream 流可以加速传输速度 */
    await client.putStream(objectName, createReadStream(file), {
      headers: {
        "Cache-Control": cacheControl,
      },
    });
    console.log(`Done: ${objectName}`);
  } else {
    /* 如果文件在 OSS已存在，则跳过该文件 (Object) */
    console.log(`Skip: ${objectName}`);
  }
}

async function main() {
  /* 首先上传不带 hash 的文件 */
  for await (const entry of readdirp("./docs/.vuepress/dist", {
    depth: 0,
    type: "files",
  })) {
    queue.add(() => uploadFile(entry.path));
  }

  /* 上传携带 hash 的文件 */
  for await (const entry of readdirp("./docs/.vuepress/dist/assets", {
    type: "files",
  })) {
    queue.add(() => uploadFile(`assets/${entry.path}`), true);
  }
}

main().catch(e => {
  console.error(e);
  process.exitCode = 1;
});
