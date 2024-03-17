import { Client } from "youtubei";

const { signal } = new AbortController();
const youtube = new Client();

export default youtube;
