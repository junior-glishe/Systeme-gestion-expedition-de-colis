import React, { useState } from "react";
import { 
  MapPin, Truck, Home, Flag, Search, Filter, 
  ArrowRight, RefreshCw, Plus, Download, 
  Grid3x3, List, Calendar, Clock, Navigation,
  CheckCircle, AlertCircle, ChevronRight,
  TrendingUp, Route, Award, MoreVertical,
  Eye, User, Package, Calendar as CalendarIcon,
  ArrowUpDown
} from "lucide-react";

export default function MesTrajets({ 
  trips = [], 
  onViewTrip = () => {},
  onRefresh = () => {},
  onNewTrip = () => {},
  onExport = () => {}
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("date");

  const getStatusColor = (status) => {
    const colors = {
      planifie: "bg-blue-100 text-blue-800",
      en_cours: "bg-emerald-100 text-emerald-800",
      termine: "bg-gray-100 text-gray-800",
      annule: "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    const icons = {
      planifie: <Calendar className="w-4 h-4" />,
      en_cours: <Truck className="w-4 h-4" />,
      termine: <CheckCircle className="w-4 h-4" />,
      annule: <AlertCircle className="w-4 h-4" />
    };
    return icons[status] || <AlertCircle className="w-4 h-4" />;
  };

  const getStatusLabel = (status) => {
    const labels = {
      planifie: "Planifié",
      en_cours: "En cours",
      termine: "Terminé",
      annule: "Annulé"
    };
    return labels[status] || status;
  };

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = 
      (trip.depart || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (trip.arrivee || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (trip.reference || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (trip.driver || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || trip.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Vue en grille
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredTrips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );

  // Vue en liste
  const ListView = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Trajet</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Départ</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Arrivée</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Distance</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Durée</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTrips.map((trip) => (
              <tr key={trip.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900">{trip.reference || "..."}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{trip.depart || "..."}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{trip.arrivee || "..."}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{trip.distance || "..."}</td>
                <td className="px-6 py-4 text-gray-600">{trip.duree || "..."}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(trip.status)}`}>
                    {getStatusIcon(trip.status)}
                    {getStatusLabel(trip.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onViewTrip(trip)}
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    Voir <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Carte trajet pour la vue grille
  const TripCard = ({ trip }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
            trip.status === 'en_cours' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
            trip.status === 'planifie' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
            'bg-gradient-to-br from-gray-500 to-gray-600'
          }`}>
            <Route className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{trip.reference || "..."}</h3>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(trip.status)}`}>
              {getStatusIcon(trip.status)}
              {getStatusLabel(trip.status)}
            </span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="relative flex items-center justify-between bg-gray-50 rounded-xl p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Home className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Départ</p>
              <p className="font-medium text-gray-900">{trip.depart || "..."}</p>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col items-center px-4">
            <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 relative">
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-gray-400">{trip.distance || "..."}</span>
              <span className="text-xs text-gray-300">•</span>
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">{trip.duree || "..."}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Flag className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Arrivée</p>
              <p className="font-medium text-gray-900">{trip.arrivee || "..."}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-500">Véhicule</p>
            <p className="text-sm font-medium text-gray-700 truncate">{trip.vehicle || "..."}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-500">Chauffeur</p>
            <p className="text-sm font-medium text-gray-700 truncate">{trip.driver || "..."}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-500">Colis</p>
            <p className="text-sm font-medium text-gray-700">{trip.packages || 0}</p>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button 
            onClick={() => onViewTrip(trip)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <Navigation className="w-4 h-4" />
            Détails
          </button>
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            Itinéraire
          </button>
        </div>
      </div>
    </div>
  );

  // Statistiques rapides
  const QuickStat = ({ label, value, color, icon: Icon, subtitle }) => (
    <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100/50">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-gray-900">{value}</p>
            {subtitle && <span className="text-xs text-gray-400">{subtitle}</span>}
          </div>
        </div>
      </div>
    </div>
  );

  const stats = {
    total: filteredTrips.length,
    planifie: filteredTrips.filter(t => t.status === "planifie").length,
    en_cours: filteredTrips.filter(t => t.status === "en_cours").length,
    termine: filteredTrips.filter(t => t.status === "termine").length
  };

  // Calcul des statistiques avancées
  const totalDistance = filteredTrips.reduce((acc, t) => {
    const dist = parseInt(t.distance) || 0;
    return acc + dist;
  }, 0);

  const totalDuration = filteredTrips.reduce((acc, t) => {
    const duration = parseInt(t.duree) || 0;
    return acc + duration;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mes trajets</h2>
          <p className="text-gray-500 mt-1">Consultez et gérez tous vos trajets</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onRefresh}
            className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow"
          >
            <RefreshCw className="w-4 h-4" />
            Actualiser
          </button>
          <button 
            onClick={onNewTrip}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Nouveau trajet
          </button>
        </div>
      </div>

      {/* Statistiques avancées */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <QuickStat 
          label="Total trajets" 
          value={stats.total} 
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          icon={Route}
        />
        <QuickStat 
          label="Planifiés" 
          value={stats.planifie} 
          color="bg-gradient-to-br from-indigo-500 to-indigo-600"
          icon={Calendar}
          subtitle="à venir"
        />
        <QuickStat 
          label="En cours" 
          value={stats.en_cours} 
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          icon={Truck}
        />
        <QuickStat 
          label="Terminés" 
          value={stats.termine} 
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          icon={CheckCircle}
        />
      </div>

      {/* Statistiques additionnelles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Distance totale</p>
              <p className="text-2xl font-bold text-blue-900">{totalDistance} km</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-200/50 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border border-emerald-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600 font-medium">Temps total</p>
              <p className="text-2xl font-bold text-emerald-900">{totalDuration} h</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-200/50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Performance</p>
              <p className="text-2xl font-bold text-purple-900">
                {stats.total > 0 ? Math.round((stats.termine / stats.total) * 100) : 0}%
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-200/50 flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100/50">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1 w-full">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Rechercher par ville de départ, arrivée ou référence..." 
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
                <option value="planifie">Planifié</option>
                <option value="en_cours">En cours</option>
                <option value="termine">Terminé</option>
                <option value="annule">Annulé</option>
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
                <option value="depart">Départ</option>
                <option value="arrivee">Arrivée</option>
                <option value="distance">Distance</option>
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
          {filteredTrips.length} trajet{filteredTrips.length > 1 ? 's' : ''} trouvé{filteredTrips.length > 1 ? 's' : ''}
        </p>
        <button 
          onClick={onExport}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          <Download className="w-4 h-4" />
          Exporter
        </button>
      </div>

      {/* Liste des trajets */}
      {filteredTrips.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100/50 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Route className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm || filterStatus !== "all" 
              ? "Aucun trajet ne correspond à vos critères" 
              : "Aucun trajet disponible"}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {searchTerm || filterStatus !== "all" 
              ? "Essayez de modifier vos filtres ou votre recherche" 
              : "Les nouveaux trajets apparaîtront ici lorsqu'ils seront planifiés"}
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