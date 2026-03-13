const productGroups = [
  {
    title: 'Brassica Vegetables',
    items: ['Napa cabbage', 'Green cabbage'],
    image:
      'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    title: 'Root Vegetables',
    items: ['Orange yams', 'White yams'],
    image:
      'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    title: 'Supply Standards',
    items: ['Careful sourcing', 'Clear communication', 'On-time delivery', 'Long-term relationships'],
    image:
      'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=1200'
  }
];

function Products({ inventoryByName = {} }) {
  return (
    <section id="products" className="section-fade rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-500">Product Page</p>
          <h2 className="mt-1 font-display text-3xl text-brand-900">Fresh produce categories</h2>
        </div>
        <p className="text-sm text-brand-600">Availability and pricing vary based on market conditions.</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {productGroups.map((group) => (
          <article key={group.title} className="card-lift overflow-hidden rounded-2xl border border-brand-100 bg-sand">
            <div className="image-mask h-44 overflow-hidden">
              <img
                src={group.image}
                alt={group.title}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="font-display text-xl text-brand-900">{group.title}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-brand-700">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center justify-between gap-2">
                    <span>• {item}</span>
                    {inventoryByName[item] !== undefined && (
                      <span className="rounded-full border border-brand-200 bg-white px-2 py-0.5 text-xs font-semibold text-brand-700">
                        {inventoryByName[item]} in stock
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-3 rounded-xl border border-brand-100 bg-gradient-to-r from-brand-50 to-sand p-4 text-sm text-brand-700 md:grid-cols-3">
        <p><span className="font-semibold text-brand-900">Ordering:</span> Request through form or phone.</p>
        <p><span className="font-semibold text-brand-900">Updates:</span> Quote includes live pricing and availability.</p>
        <p><span className="font-semibold text-brand-900">Delivery:</span> Scheduled to your service window.</p>
      </div>
    </section>
  );
}

export default Products;
