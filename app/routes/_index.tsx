import { type MetaFunction, type LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";

interface Salary {
    id: number,
    sector:string,
    general_code:string,
    code_category:string,
    salary_code:string,
    salary:string,
    year:string,
    desc:string,
    status:string,
    created_at:string,
    updated_at:string,
}


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare!",
    },
  ];
};

export async function loader({context}: LoaderFunctionArgs) {
  const env = context.cloudflare.env;
  const {results} = await env.DB.prepare("SELECT * from salaries").all();
  return json(results)
}

export default function Index() {

  const salaries = useLoaderData<Salary[]>();
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to a bloke sarali advansi</h1>
      <ul className="list-disc mt-4 pl-6 space-y-2">
        {
          salaries.map(salary=>(     <li key={salary.id}>
            <Link
              className="text-blue-700 underline visited:text-purple-900"
              to={`salaries/${salary.id}`}
              rel="noreferrer"
            >
              {salary.salary_code} - {salary.sector}
            </Link>
          </li>))
        }
   
     
      </ul>
    </div>
  );
}
