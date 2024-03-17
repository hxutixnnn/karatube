import { youtubeSearch } from "./actions/search.action";
import { KtHomePage } from "./components/KtHomePage";

// export const fetchCache = 'force-no-store'

export default async function Page() {
  // const data = await youtubeSearch('official beat chuẩn');
  // return <KtHomePage initialData={data} />;
  return <KtHomePage />;
}
