import React, { useState } from "react";
import { 
  Package, Eye, Plus, Search, Filter, MapPin, 
  MoreVertical, Clock, ChevronRight, Grid3x3, 
  List, Download, RefreshCw, XCircle, CheckCircle,
  AlertCircle, Truck, User, Calendar, ArrowUpDown
} from "lucide-react";

export default function MesColis({ packages = [], onViewPackage = () => {} }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("date");

  const getStatusColor = (status) => {
    const colors = {
      en_attente: "bg-yellow-100 text-yellow-800",
      en_cours: "bg-blue-100 text-blue-800",
      arrive: "bg-green-100 text-green-800",
      livre: "bg-purple-100 text-purple-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    const icons = {
      en_attente: <Clock className="w-4 h-4" />,
      en_cours: <Truck className="w-4 h-4" />,
      arrive: <CheckCircle className="w-4 h-4" />,
      livre: <CheckCircle className="w-4 h-4" />
    };
    return icons[status] || <AlertCircle className="w-4 h-4" />;
  };

  const getStatusLabel = (status) => {
    const labels = {
      en_attente: "En attente",
      en_cours: "En cours",
      arrive: "Arrivé à destination",
      livre: "Livré"
    };
    return labels[status] || status;
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = 
      (pkg.reference || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pkg.client || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pkg.destination || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || pkg.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Vue en grille (carte)
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredPackages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );

  // Vue en liste (tableau)
  const ListView = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Référence</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Destination</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Poids</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPackages.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900">{pkg.reference || "..."}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">{pkg.client || "..."}</td>
                <td className="px-6 py-4 text-gray-600">{pkg.destination || "..."}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(pkg.status)}`}>
                    {getStatusIcon(pkg.status)}
                    {getStatusLabel(pkg.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{pkg.weight || "..."}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onViewPackage(pkg)}
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Carte colis pour la vue grille
  const PackageCard = ({ pkg }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{pkg.reference || "..."}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <User className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-sm text-gray-500">{pkg.client || "..."}</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm bg-gray-50 rounded-xl p-3">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-gray-600 truncate">{pkg.destination || "..."}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Poids: <span className="font-medium text-gray-700">{pkg.weight || "..."}</span></span>
          <span className="text-gray-500">Dimensions: <span className="font-medium text-gray-700">{pkg.dimensions || "..."}</span></span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(pkg.status)}`}>
            {getStatusIcon(pkg.status)}
            {getStatusLabel(pkg.status)}
          </span>
          <button 
            onClick={() => onViewPackage(pkg)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform"
          >
            Détails <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Statistiques rapides
  const QuickStat = ({ label, value, color, icon: Icon }) => (
    <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100/50">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-lg font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  const stats = {
    total: filteredPackages.length,
    en_attente: filteredPackages.filter(p => p.status === "en_attente").length,
    en_cours: filteredPackages.filter(p => p.status === "en_cours").length,
    livre: filteredPackages.filter(p => p.status === "livre").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mes colis</h2>
          <p className="text-gray-500 mt-1">Gérez tous vos colis en un seul endroit</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow">
            <RefreshCw className="w-4 h-4" />
            Actualiser
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg">
            <Plus className="w-4 h-4" />
            Nouveau colis
          </button>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <QuickStat 
          label="Total" 
          value={stats.total} 
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          icon={Package}
        />
        <QuickStat 
          label="En attente" 
          value={stats.en_attente} 
          color="bg-gradient-to-br from-yellow-500 to-yellow-600"
          icon={Clock}
        />
        <QuickStat 
          label="En cours" 
          value={stats.en_cours} 
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          icon={Truck}
        />
        <QuickStat 
          label="Livrés" 
          value={stats.livre} 
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          icon={CheckCircle}
        />
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100/50">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1 w-full">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Rechercher par référence, client ou destination..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">Tous les statuts</option>
                <option value="en_attente">En attente</option>
                <option value="en_cours">En cours</option>
                <option value="arrive">Arrivé à destination</option>
                <option value="livre">Livré</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-gray-400" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="date">Date</option>
                <option value="client">Client</option>
                <option value="destination">Destination</option>
              </select>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid" 
                    ? "bg-white shadow-sm text-blue-600" 
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list" 
                    ? "bg-white shadow-sm text-blue-600" 
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {filteredPackages.length} colis trouvés
        </p>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
          <Download className="w-4 h-4" />
          Exporter
        </button>
      </div>

      {/* Liste des colis */}
      {filteredPackages.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100/50 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm || filterStatus !== "all" 
              ? "Aucun colis ne correspond à vos critères" 
              : "Aucun colis disponible"}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {searchTerm || filterStatus !== "all" 
              ? "Essayez de modifier vos filtres ou votre recherche" 
              : "Les colis qui vous sont affectés apparaîtront ici"}
          </p>
          {(searchTerm || filterStatus !== "all") && (
            <button 
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      ) : (
        viewMode === "grid" ? <GridView /> : <ListView />
      )}
    </div>
  );
}