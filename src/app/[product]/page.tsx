import SingleCoinChart from "@/containers/SingleCoinChart";

export default function Page({ params }: { params: { product: string } }) {
  console.log(params.product);
  return (
    <div>
      <SingleCoinChart coinId={params.product} />
    </div>
  );
}
