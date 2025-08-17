import React, { useState } from 'react';
import { Package, Search, Filter, Plus, Eye, Edit, Phone, MessageSquare, CheckCircle, Clock, AlertTriangle, Shield, UserCheck, MapPin, Calendar, FileText, Download, Star, UserPlus, Truck, Users } from 'lucide-react';
import { 
  mockBeneficiaries, 
  mockPackages, 
  mockTasks,
  type Beneficiary,
  type Package as PackageType,
  type Task
} from '../data/mockData';

interface PackageManagementProps {
  initialTab?: string;
}

export default function PackageManagement({ initialTab = 'packages-list' }: PackageManagementProps) {
  const currentTab = initialTab === 'packages-list' ? 'list' : 
                     initialTab === 'bulk-send' ? 'bulk-send' :
                     initialTab === 'individual-send' ? 'individual-send' :
                     initialTab === 'tracking' ? 'tracking' :
                     initialTab === 'distribution-reports' ? 'distribution-reports' : 'list';
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');

  const handleAddPackage = () => {
    setModalType('add');
    setSelectedPackage(null);
    setShowModal(true);
  };

  const handleEditPackage = (pkg: PackageType) => {
    setModalType('edit');
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const handleViewPackage = (pkg: PackageType) => {
    setModalType('view');
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in_delivery': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'تم التسليم';
      case 'in_delivery': return 'قيد التوصيل';
      case 'assigned': return 'مُعيّن';
      case 'pending': return 'في الانتظار';
      case 'failed': return 'فشل';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Packages List Tab */}
        {currentTab === 'list' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">قوالب الطرود</h2>
                <p className="text-gray-600 mt-1">إدارة جميع قوالب الطرود في النظام</p>
              </div>
              <div className="flex space-x-3 space-x-reverse">
                <button className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors flex items-center">
                  <Download className="w-4 h-4 ml-2" />
                  تصدير القائمة
                </button>
                <button 
                  onClick={handleAddPackage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة قالب جديد
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="البحث في الطرود (الاسم، النوع، المؤسسة)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 space-x-reverse px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4 ml-2" />
                  <span>فلترة متقدمة</span>
                </button>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">إجمالي الطرود</p>
                    <p className="text-3xl font-bold text-gray-900">{mockPackages.length}</p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-2xl">
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">تم التسليم</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {mockPackages.filter(p => p.status === 'delivered').length}
                    </p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-2xl">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">قيد التوصيل</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {mockPackages.filter(p => p.status === 'in_delivery').length}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-2xl">
                    <Truck className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">في الانتظار</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {mockPackages.filter(p => p.status === 'pending').length}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-2xl">
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Packages Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">قائمة الطرود ({mockPackages.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الطرد
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        النوع
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        المستفيد
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        تاريخ الإنشاء
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockPackages.map((pkg) => {
                      const beneficiary = mockBeneficiaries.find(b => b.id === pkg.beneficiaryId);
                      return (
                        <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="bg-blue-100 p-2 rounded-xl ml-4">
                                <Package className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                                <div className="text-sm text-gray-500">{pkg.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {pkg.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {beneficiary ? beneficiary.name : 'غير محدد'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(pkg.createdAt).toLocaleDateString('ar-SA')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                              {getStatusText(pkg.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2 space-x-reverse">
                              <button 
                                onClick={() => handleViewPackage(pkg)}
                                className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors" 
                                title="عرض التفاصيل"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleEditPackage(pkg)}
                                className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50 transition-colors" 
                                title="تعديل"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                className="text-purple-600 hover:text-purple-900 p-2 rounded-lg hover:bg-purple-50 transition-colors" 
                                title="تتبع"
                              >
                                <MapPin className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Send Tab */}
        {currentTab === 'bulk-send' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">الإرسال الجماعي</h2>
                <p className="text-gray-600 mt-1">إرسال طرود متعددة لمجموعة من المستفيدين</p>
              </div>
              <div className="flex space-x-3 space-x-reverse">
                <button className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors">
                  بدء الإرسال الجماعي
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center">
                <div className="bg-gray-100 rounded-2xl p-12 mb-6">
                  <Users className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">الإرسال الجماعي</h3>
                <p className="text-gray-600 mb-6">هذا القسم قيد التطوير - سيتم إضافة التفاصيل الكاملة قريباً</p>
                <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
                  ابدأ التطوير
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Individual Send Tab */}
        {currentTab === 'individual-send' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">الإرسال الفردي</h2>
                <p className="text-gray-600 mt-1">إرسال طرد لمستفيد واحد</p>
              </div>
              <div className="flex space-x-3 space-x-reverse">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                  إرسال طرد فردي
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center">
                <div className="bg-gray-100 rounded-2xl p-12 mb-6">
                  <UserPlus className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">الإرسال الفردي</h3>
                <p className="text-gray-600 mb-6">هذا القسم قيد التطوير - سيتم إضافة التفاصيل الكاملة قريباً</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  ابدأ التطوير
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tracking Tab */}
        {currentTab === 'tracking' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">تتبع الإرسالات</h2>
                <p className="text-gray-600 mt-1">متابعة حالة الطرود والإرسالات</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center">
                <div className="bg-gray-100 rounded-2xl p-12 mb-6">
                  <Truck className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">تتبع الإرسالات</h3>
                <p className="text-gray-600 mb-6">هذا القسم قيد التطوير - سيتم إضافة التفاصيل الكاملة قريباً</p>
                <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-700 transition-colors">
                  ابدأ التطوير
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Distribution Reports Tab */}
        {currentTab === 'distribution-reports' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">تقارير التوزيع</h2>
                <p className="text-gray-600 mt-1">تقارير مفصلة عن عمليات التوزيع</p>
              </div>
              <div className="flex space-x-3 space-x-reverse">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors flex items-center">
                  <Download className="w-4 h-4 ml-2" />
                  تصدير التقرير
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center">
                <div className="bg-gray-100 rounded-2xl p-12 mb-6">
                  <FileText className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">تقارير التوزيع</h3>
                <p className="text-gray-600 mb-6">هذا القسم قيد التطوير - سيتم إضافة التفاصيل الكاملة قريباً</p>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
                  ابدأ التطوير
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Add/Edit/View */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" dir="rtl">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {modalType === 'add' ? 'إضافة طرد جديد' : modalType === 'edit' ? 'تعديل الطرد' : 'عرض تفاصيل الطرد'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-xl p-8 mb-4">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">نموذج {modalType === 'add' ? 'الإضافة' : modalType === 'edit' ? 'التعديل' : 'العرض'}</p>
                <p className="text-sm text-gray-500 mt-2">سيتم تطوير النماذج التفاعلية هنا</p>
              </div>
              
              <div className="flex space-x-3 space-x-reverse justify-center">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                {modalType !== 'view' && (
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                    {modalType === 'add' ? 'إضافة الطرد' : 'حفظ التغييرات'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}