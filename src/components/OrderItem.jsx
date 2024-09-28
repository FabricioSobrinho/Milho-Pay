function OrderItem({ item }) {
  return (
    <div>
      <p>Nome: {item.nome}</p>
      <p>Quantidade: {item.quantidade}</p>
      <p>Valor: {item.valor}</p>
    </div>
  );
}

export default OrderItem;
