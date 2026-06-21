import React, { useState, useEffect } from "react";
import { 
  Package, Truck, AlertTriangle, Clock, Eye, Plus, 
  MoreVertical, MapPin, ArrowRight, Home, Flag,
  TrendingUp, Users, Calendar, ChevronRight, 
  CheckCircle, XCircle, AlertCircle, BarChart3
} from "lucide-react";

export default function Dashboard({ 
  packages = [], 
  incidents = [], 
  trips = [], 
  onViewPackage = () => {}, 
  onViewTrip = () => {}, 
  onDeclareIncident = () => {} 
}) {
  const [stats, setStats] = useState({
    totalPackages: 0,
    ongoingDeliveries: 0,
    openIncidents: 0,
    todayDeliveries: 0,
    completionRate: 0
  });

  useEffect(() => {
    const total = packages?.length || 0;
    const delivered = packages?.filter(p => p.status === "livre")?.length || 0;
    
    setStats({
      totalPackages: total,
      ongoingDeliveries: packages?.filter(p => p.status === "en_cours")?.length || 0,
      openIncidents: incidents?.length || 0,
      todayDeliveries: packages?.filter(p => {
        const today = new Date().toDateString();
        return p.deliveryDate && new Date(p.deliveryDate).toDateString() === today;
      })?.length || 0,
      completionRate: total > 0 ? Math.round((delivered / total) * 100) : 0
    });
  }, [packages, incidents]);

  // Statistiques modernisées
  const StatCard = ({ icon: Icon, title, value, color, subtitle, trend }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 group cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value || 0}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              {trend && <TrendingUp className="w-3 h-3 text-green-500" />}
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-2xl ${color} shadow-lg shadow-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );

  // Carte de progression
  const ProgressCard = ({ title, value, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <span className="text-lg font-bold text-gray-900">{value}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div 
          className={`h-2.5 rounded-full transition-all duration-1000 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  // Colis Card redesigné
  const PackageCard = ({ pkg, onView }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{pkg.reference || "..."}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{pkg.client || "..."}</p>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(pkg.status)}`}>
          {getStatusLabel(pkg.status)}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-xl p-3 mt-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="truncate">{pkg.destination || "..."}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Package className="w-4 h-4 text-gray-400" />
          <span>{pkg.weight || "..."} • {pkg.dimensions || "..."}</span>
        </div>
      </div>

      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
        <button 
          onClick={() => onView(pkg)}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Eye className="w-4 h-4" />
          Détails
        </button>
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" />
          Statut
        </button>
      </div>
    </div>
  );

  // Incident Item redesigné
  const IncidentItem = ({ incident }) => (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
      <div className={`p-2 rounded-xl ${incident.gravite === 'Élevée' || incident.gravite === 'Critique' ? 'bg-red-100' : 'bg-yellow-100'}`}>
        <AlertTriangle className={`w-5 h-5 ${incident.gravite === 'Élevée' || incident.gravite === 'Critique' ? 'text-red-600' : 'text-yellow-600'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-900">{incident.expedition || "..."}</p>
          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
            incident.gravite === 'Critique' ? 'bg-red-100 text-red-700' :
            incident.gravite === 'Élevée' ? 'bg-red-100 text-red-700' : 
            incident.gravite === 'Moyenne' ? 'bg-yellow-100 text-yellow-700' : 
            'bg-green-100 text-green-700'
          }`}>
            {incident.gravite || "..."}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-0.5">{incident.description || "..."}</p>
        <p className="text-xs text-gray-400 mt-1">{incident.date || "..."}</p>
      </div>
    </div>
  );

  // Trip Card redesigné
  const TripCard = ({ trip, onView }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Truck className="w-5 h-5 text-blue-600" />
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(trip.status)}`}>
            {getStatusLabel(trip.status)}
          </span>
        </div>
        <button 
          onClick={() => onView(trip)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform"
        >
          Voir <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
          <div className="flex items-center gap-3">
            <Home className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">{trip.depart || "..."}</span>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-300" />
          <div className="flex items-center gap-3">
            <Flag className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">{trip.arrivee || "..."}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Distance: <span className="font-medium text-gray-700">{trip.distance || "..."}</span></span>
          <span className="text-gray-500">Durée: <span className="font-medium text-gray-700">{trip.duree || "..."}</span></span>
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    const colors = {
      en_attente: "bg-yellow-100 text-yellow-800",
      en_cours: "bg-blue-100 text-blue-800",
      arrive: "bg-green-100 text-green-800",
      livre: "bg-purple-100 text-purple-800",
      planifie: "bg-gray-100 text-gray-800",
      termine: "bg-green-100 text-green-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status) => {
    const labels = {
      en_attente: "En attente",
      en_cours: "En cours",
      arrive: "Arrivé",
      livre: "Livré",
      planifie: "Planifié",
      termine: "Terminé"
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-6">
      {/* Header avec bienvenue */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Bonsoir, Chauffeur </h1>
            <p className="text-blue-100 mt-1">Voici un résumé de vos activités aujourd'hui</p>
          </div>
          <div className="flex items-center gap-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Statistiques modernisées */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard 
          icon={Package} 
          title="Colis affectés" 
          value={stats.totalPackages} 
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          subtitle="Total des colis"
        />
        <StatCard 
          icon={Truck} 
          title="En cours" 
          value={stats.ongoingDeliveries} 
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          subtitle={`${stats.totalPackages - stats.ongoingDeliveries} en attente`}
          trend={true}
        />
        <StatCard 
          icon={AlertTriangle} 
          title="Incidents" 
          value={stats.openIncidents} 
          color="bg-gradient-to-br from-red-500 to-red-600"
          subtitle="À traiter"
        />
        <StatCard 
          icon={Clock} 
          title="Aujourd'hui" 
          value={stats.todayDeliveries} 
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          subtitle="Livraisons prévues"
        />
        <StatCard 
          icon={BarChart3} 
          title="Taux complétion" 
          value={`${stats.completionRate}%`} 
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          subtitle="Colis livrés"
          trend={stats.completionRate > 50}
        />
      </div>

      {/* Progression */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProgressCard title="Taux de livraison" value={stats.completionRate} color="bg-gradient-to-r from-blue-500 to-blue-600" />
        <ProgressCard title="Performance" value={Math.min(100, stats.completionRate + 15)} color="bg-gradient-to-r from-emerald-500 to-emerald-600" />
        <ProgressCard title="Satisfaction" value={Math.min(100, stats.completionRate + 20)} color="bg-gradient-to-r from-purple-500 to-purple-600" />
      </div>

      {/* Colonnes des dernières activités */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colis récents */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Mes colis récents</h2>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
                Voir tout <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {packages.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Aucun colis pour le moment</p>
                  <p className="text-sm text-gray-400 mt-1">Les nouveaux colis apparaîtront ici</p>
                </div>
              ) : (
                packages.slice(0, 2).map((pkg) => (
                  <PackageCard 
                    key={pkg.id} 
                    pkg={pkg} 
                    onView={onViewPackage}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Incidents récents */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100/50 h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Incidents</h2>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                Voir tout
              </button>
            </div>
            <div className="space-y-3">
              {incidents.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Aucun incident</p>
                  <p className="text-sm text-gray-400 mt-1">Tout est sous contrôle</p>
                </div>
              ) : (
                incidents.slice(0, 3).map((incident) => (
                  <IncidentItem key={incident.id} incident={incident} />
                ))
              )}
              <button 
                onClick={onDeclareIncident}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Déclarer un incident
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trajets en cours */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Truck className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Trajets en cours</h2>
          </div>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
            Voir tout <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trips.length === 0 ? (
            <div className="text-center py-12 col-span-3 bg-gray-50 rounded-xl">
              <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Aucun trajet planifié</p>
              <p className="text-sm text-gray-400 mt-1">Les nouveaux trajets apparaîtront ici</p>
            </div>
          ) : (
            trips.filter(t => t.status === "en_cours" || t.status === "planifie").slice(0, 3).map((trip) => (
              <TripCard 
                key={trip.id} 
                trip={trip} 
                onView={onViewTrip}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}