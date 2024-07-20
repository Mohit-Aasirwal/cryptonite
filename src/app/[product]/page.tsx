export default function Page({ params }: { params: { product: string } }) {
  return <div>My Post: {params.product}</div>;
}
