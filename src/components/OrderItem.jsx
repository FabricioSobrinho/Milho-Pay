function OrderItem({ order }) {
  return (
    <div>
      {order.dishs && order.dishs.length > 0 && (
        <>
          <h4>Pratos</h4>
          {order.dishs.map((item, index) => (
            <div key={index}>
              <p>Nome: {item.name}</p>
              <p>Quantidade: {item.quantity}</p>
              <p>Preço: {item.price}</p>
            </div>
          ))}
        </>
      )}
      {order.drinks && order.drinks.length > 0 && (
        <>
          <h4>Bebidas</h4>
          {order.drinks.map((item, index) => (
            <div key={index}>
              <p>Nome: {item.name}</p>
              <p>Quantidade: {item.quantity}</p>
              <p>Preço: {item.price}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default OrderItem;
