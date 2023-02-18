import { useRouter } from "next/router";

interface IUseCodeAndSlugReturn {
  status: "fail" | "success";
  code: string;
  slug: string;
}

export function useCodeAndSlug(): IUseCodeAndSlugReturn {
  const router = useRouter();
  const result: IUseCodeAndSlugReturn = { status: "fail", code: "", slug: "" };
  if (!router || !router.query) return result;

  const { codeAndSlug } = router.query;

  if (!(codeAndSlug && Array.isArray(codeAndSlug) && codeAndSlug.length === 2))
    return result;

  const [code, slug] = codeAndSlug;

  result.status = "success";
  result.code = code;
  result.slug = slug;

  return result;
}
