/**
 * Order History Management Utilities
 * Sipariş geçmişini yönetmek için yardımcı fonksiyonlar
 */

/**
 * Yeni bir sipariş oluşturur ve geçmişe ekler
 * @param {Array} currentHistory - Mevcut sipariş geçmişi
 * @param {Array} cart - Sepetteki ürünler
 * @param {Object} purchaseHistory - API'den gelen satın alma verileri
 * @param {boolean} discountActive - İndirim aktif mi?
 * @returns {Array} - Güncellenmiş sipariş geçmişi
 */
export const addOrderToHistory = (currentHistory, cart, purchaseHistory, discountActive) => {
  if (!cart || cart.length === 0) {
    return currentHistory;
  }

  // Yeni sipariş ID'si oluştur
  const orderCount = currentHistory.length + 1;
  const orderId = `ORD-${new Date().getFullYear()}-${String(orderCount).padStart(3, '0')}`;

  // Sipariş tarihini oluştur (ISO formatında)
  const orderDate = new Date().toISOString().split('T')[0];

  // Siparişdeki ürünleri dönüştür
  const orderProducts = cart.map(cartItem => {
    const quantity = cartItem.quantity || 1;
    const purchaseData = purchaseHistory?.[cartItem.id];

    // Orijinal fiyatı belirle
    const originalPrice = purchaseData?.original_data?.original_price || cartItem.price;

    // İndirimli fiyatı ve indirim yüzdesini hesapla
    let discountedPrice = originalPrice;
    let discountPercentage = 0;

    if (discountActive && purchaseData?.original_data?.discount_applied) {
      const offerDetails = purchaseData.original_data.offer_details;
      discountedPrice = offerDetails.final_price;
      discountPercentage = Math.round(offerDetails.discount_percentage || 0);
    }

    return {
      id: cartItem.id,
      name: cartItem.name,
      brand: cartItem.brand || '',
      category: cartItem.category || '',
      image: cartItem.image || '',
      quantity: quantity,
      originalPrice: originalPrice,
      discountedPrice: discountedPrice,
      discount: discountPercentage
    };
  });

  // Toplam tutarları hesapla
  const totalOriginal = orderProducts.reduce((sum, product) =>
    sum + (product.originalPrice * product.quantity), 0
  );

  const totalPaid = orderProducts.reduce((sum, product) =>
    sum + (product.discountedPrice * product.quantity), 0
  );

  const totalSavings = totalOriginal - totalPaid;

  // Yeni siparişi oluştur
  const newOrder = {
    id: orderCount,
    orderId: orderId,
    date: orderDate,
    products: orderProducts,
    totalOriginal: parseFloat(totalOriginal.toFixed(2)),
    totalPaid: parseFloat(totalPaid.toFixed(2)),
    totalSavings: parseFloat(totalSavings.toFixed(2)),
    status: 'Çatdırılıb', // Varsayılan olarak teslim edildi
    timestamp: new Date().toISOString() // Sıralama için zaman damgası
  };

  // Yeni siparişi geçmişin başına ekle (en yeni en üstte)
  return [newOrder, ...currentHistory];
};

/**
 * Sipariş durumunu günceller
 * @param {Array} currentHistory - Mevcut sipariş geçmişi
 * @param {string} orderId - Sipariş ID'si
 * @param {string} newStatus - Yeni durum
 * @returns {Array} - Güncellenmiş sipariş geçmişi
 */
export const updateOrderStatus = (currentHistory, orderId, newStatus) => {
  return currentHistory.map(order =>
    order.orderId === orderId
      ? { ...order, status: newStatus }
      : order
  );
};

/**
 * Siparişleri tarihe göre sıralar
 * @param {Array} orders - Siparişler
 * @param {string} direction - 'asc' veya 'desc'
 * @returns {Array} - Sıralanmış siparişler
 */
export const sortOrdersByDate = (orders, direction = 'desc') => {
  return [...orders].sort((a, b) => {
    const dateA = new Date(a.timestamp || a.date);
    const dateB = new Date(b.timestamp || b.date);

    return direction === 'desc'
      ? dateB - dateA
      : dateA - dateB;
  });
};

/**
 * localStorage'dan sipariş geçmişini yükler
 * @returns {Array} - Sipariş geçmişi
 */
export const loadOrderHistory = () => {
  try {
    const saved = localStorage.getItem('orderHistory');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Sipariş geçmişi yüklenirken hata:', error);
    return [];
  }
};

/**
 * Sipariş geçmişini localStorage'a kaydeder
 * @param {Array} history - Sipariş geçmişi
 */
export const saveOrderHistory = (history) => {
  try {
    localStorage.setItem('orderHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Sipariş geçmişi kaydedilirken hata:', error);
  }
};

/**
 * Tüm sipariş istatistiklerini hesaplar
 * @param {Array} orders - Siparişler
 * @returns {Object} - İstatistikler
 */
export const calculateOrderStats = (orders) => {
  if (!orders || orders.length === 0) {
    return {
      totalOrders: 0,
      totalProducts: 0,
      totalSpent: 0,
      totalSaved: 0
    };
  }

  return {
    totalOrders: orders.length,
    totalProducts: orders.reduce((sum, order) =>
      sum + order.products.reduce((pSum, product) => pSum + product.quantity, 0), 0
    ),
    totalSpent: orders.reduce((sum, order) => sum + order.totalPaid, 0),
    totalSaved: orders.reduce((sum, order) => sum + order.totalSavings, 0)
  };
};
