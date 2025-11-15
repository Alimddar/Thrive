import { Package, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = ({ orderHistory = [] }) => {

  // Calculate statistics from COMPLETED ORDERS (orderHistory)
  let totalPurchasedProducts = 0;
  let totalRevenue = 0;
  let totalOriginalRevenue = 0;
  let productsWithDiscount = 0;

  // Loop through all completed orders and their products
  orderHistory.forEach(order => {
    if (order.products && Array.isArray(order.products)) {
      order.products.forEach(product => {
        const quantity = product.quantity || 1;
        totalPurchasedProducts += quantity;

        // Add to revenue
        const productRevenue = product.discountedPrice * quantity;
        const productOriginalRevenue = product.originalPrice * quantity;

        totalRevenue += productRevenue;
        totalOriginalRevenue += productOriginalRevenue;

        // Count products with discount (if discounted price < original price)
        if (product.discount > 0) {
          productsWithDiscount += quantity;
        }
      });
    }
  });

  const averagePrice = totalPurchasedProducts > 0 ? totalRevenue / totalPurchasedProducts : 0;

  // Calculate real spending data from completed orders (monthly totals)
  const calculateSpendingData = () => {
    // Calculate total spending for current month from completed orders
    let totalBeforeCurrent = 0;
    let totalAfterCurrent = 0;

    // Loop through all completed orders
    orderHistory.forEach(order => {
      // Add to totals based on order data
      totalBeforeCurrent += order.totalOriginal || 0;
      totalAfterCurrent += order.totalPaid || 0;
    });

    // Show current month data only (will be updated monthly)
    const monthlyData = {
      before: [0, 0, Math.round(totalBeforeCurrent)], // Current month at position 3
      after: [0, 0, Math.round(totalAfterCurrent)]
    };

    return monthlyData;
  };

  const spendingData = calculateSpendingData();
  const beforeDiscountData = spendingData.before;
  const afterDiscountData = spendingData.after;

  const spendingComparisonData = {
    labels: ['Keçən 2 ay', 'Keçən ay', 'Bu ay'],
    datasets: [
      {
        label: 'Discount olmadan əvvəlki xərc (₼)',
        data: beforeDiscountData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'Discount olunduqdan sonra xərc (₼)',
        data: afterDiscountData,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  // Calculate spending statistics (handle 0 division) - monthly totals
  const totalBeforeDiscount = beforeDiscountData[2]; // Current month total
  const totalAfterDiscount = afterDiscountData[2]; // Current month total
  const totalSavings = totalBeforeDiscount - totalAfterDiscount;
  const savingsPercentage = totalBeforeDiscount > 0 ? ((totalSavings / totalBeforeDiscount) * 100).toFixed(1) : '0.0';

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">İdarə Paneli</h1>
        <p className="dashboard-subtitle">Statistika və məhsul analizi</p>
      </div>

      {/* Statistics Cards - ONLY from purchaseHistory */}
      <div className="dashboard-stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
            <Package size={24} color="white" />
          </div>
          <div className="stat-info">
            <h3>{totalPurchasedProducts}</h3>
            <p>Alınmış Məhsul</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <DollarSign size={24} color="white" />
          </div>
          <div className="stat-info">
            <h3>{totalRevenue.toFixed(0)} ₼</h3>
            <p>Ödənilmiş Məbləğ</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <TrendingUp size={24} color="white" />
          </div>
          <div className="stat-info">
            <h3>{averagePrice.toFixed(0)} ₼</h3>
            <p>Orta Qiymət</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <ShoppingCart size={24} color="white" />
          </div>
          <div className="stat-info">
            <h3>{productsWithDiscount}</h3>
            <p>Endirimli Məhsul</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* User Spending Comparison: Before vs After Discount */}
        <div className="chart-card large" style={{ gridColumn: '1 / -1' }}>
          <div className="chart-header">
            <h3>İstifadəçi Xərc Müqayisəsi</h3>
            <span className="chart-badge">Aylıq ümumi statistika</span>
          </div>
          <div className="chart-wrapper">
            <Line data={spendingComparisonData} options={chartOptions} />
          </div>

          {/* Summary Section */}
          <div style={{
            marginTop: '30px',
            padding: '25px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <h4 style={{
              marginBottom: '20px',
              fontSize: '18px',
              fontWeight: '600',
              color: '#1a202c'
            }}>
              📊 Xülasə Məlumat
            </h4>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>
                  Discount əvvəl (bu ay toplam)
                </div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ef4444' }}>
                  {totalBeforeDiscount.toLocaleString()} ₼
                </div>
                <div style={{ fontSize: '13px', color: '#a0aec0', marginTop: '5px' }}>
                  Bu ay ərzində ümumi xərc
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>
                  Discount sonra (bu ay toplam)
                </div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>
                  {totalAfterDiscount.toLocaleString()} ₼
                </div>
                <div style={{ fontSize: '13px', color: '#a0aec0', marginTop: '5px' }}>
                  Endirimlə ödənilən məbləğ
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                color: 'white'
              }}>
                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
                  Ümumi Qənaət
                </div>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                  {totalSavings.toLocaleString()} ₼
                </div>
                <div style={{ fontSize: '13px', opacity: 0.85, marginTop: '5px' }}>
                  {savingsPercentage}% daha az xərc
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '20px',
              padding: '15px 20px',
              background: totalSavings > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)',
              borderLeft: totalSavings > 0 ? '4px solid #10b981' : '4px solid #6b7280',
              borderRadius: '6px'
            }}>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: '#1a202c',
                lineHeight: '1.6'
              }}>
                {totalSavings > 0 ? (
                  <>
                    💡 <strong>Nəticə:</strong> Discount proqramı sayəsində bu ay <strong>{totalSavings.toLocaleString()} ₼</strong> qənaət edilmişdir.
                    Bu, ümumi xərcinizdən <strong>{savingsPercentage}%</strong> azalma deməkdir.
                  </>
                ) : (
                  <>
                    💡 <strong>Nəticə:</strong> Hələ heç bir alış-veriş edilməmişdir. Məhsul əlavə edin və discount proqramından yararlanın!
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
