import React, { useState, useEffect } from "react";
import { Package, Truck, AlertTriangle, Clock, Eye, Plus, Search, User, MoreVertical, MapPin, ArrowRight, Home, Flag } from "lucide-react";

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
    todayDeliveries: 0
  });

  useEffect(() => {
    setStats({
      totalPackages: packages?.length || 0,
      ongoingDeliveries: packages?.filter(p => p.status === "en_cours")?.length || 0,
      openIncidents: incidents?.length || 0,
      todayDeliveries: packages?.filter(p => {
        const today = new Date().toDateString();
        return p.deliveryDate && new Date(p.deliveryDate).toDateString() === today;
      })?.length || 0
    });
  }, [packages, incidents]);

  const StatCard = ({ icon: Icon, title, value, color, subtitle }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value || 0}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const PackageCard = ({ pkg, onView }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{pkg.reference || "..."}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(pkg.status)}`}>
              {getStatusLabel(pkg.status)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{pkg.client || "..."}</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{pkg.destination || "..."}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Package className="w-4 h-4 text-gray-400" />
          <span>{pkg.weight || "..."} • {pkg.dimensions || "..."}</span>
        </div>
      </div>

      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
        <button 
          onClick={() => onView(pkg)}
          className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
        >
          <Eye className="w-4 h-4" />
          Détails
        </button>
        <button className="flex-1 bg-gray-50 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1">
          <Clock className="w-4 h-4" />
          Statut
        </button>
      </div>
    </div>
  );

  const IncidentItem = ({ incident }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <AlertTriangle className={`w-5 h-5 ${incident.gravite === 'Élevée' || incident.gravite === 'Critique' ? 'text-red-500' : 'text-yellow-500'}`} />
            <div>
              <p className="font-medium text-gray-900">{incident.expedition || "..."}</p>
              <p className="text-sm text-gray-600 mt-0.5">{incident.description || "..."}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{incident.date || "..."}</span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            incident.gravite === 'Critique' ? 'bg-red-100 text-red-700' :
            incident.gravite === 'Élevée' ? 'bg-red-100 text-red-700' : 
            incident.gravite === 'Moyenne' ? 'bg-yellow-100 text-yellow-700' : 
            'bg-green-100 text-green-700'
          }`}>
            {incident.gravite || "..."}
          </span>
        </div>
      </div>
    </div>
  );

  const TripCard = ({ trip, onView }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-blue-600" />
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(trip.status)}`}>
            {getStatusLabel(trip.status)}
          </span>
        </div>
        <button 
          onClick={() => onView(trip)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
        >
          Voir <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">{trip.depart || "..."}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Flag className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">{trip.arrivee || "..."}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{trip.distance || "..."}</p>
          <p className="text-sm text-gray-500">{trip.duree || "..."}</p>
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
      arrive: "Arrivé à destination",
      livre: "Livré",
      planifie: "Planifié",
      termine: "Terminé"
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          icon={Package} 
          title="Colis affectés" 
          value={stats.totalPackages} 
          color="bg-blue-500"
          subtitle="Dernier ajout aujourd'hui"
        />
        <StatCard 
          icon={Truck} 
          title="Expéditions en cours" 
          value={stats.ongoingDeliveries} 
          color="bg-green-500"
          subtitle={`${stats.totalPackages - stats.ongoingDeliveries} en attente`}
        />
        <StatCard 
          icon={AlertTriangle} 
          title="Incidents ouverts" 
          value={stats.openIncidents} 
          color="bg-red-500"
          subtitle="Nécessite attention"
        />
        <StatCard 
          icon={Clock} 
          title="Livraisons aujourd'hui" 
          value={stats.todayDeliveries} 
          color="bg-purple-500"
          subtitle="En cours de traitement"
        />
      </div>

      {/* Colonnes des dernières activités */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colis récents */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Mes colis récents</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Voir tout
              </button>
            </div>
            <div className="space-y-4">
              {packages.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Aucun colis pour le moment</p>
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
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Incidents</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Voir tout
              </button>
            </div>
            <div className="space-y-3">
              {incidents.length === 0 ? (
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Aucun incident signalé</p>
                </div>
              ) : (
                incidents.slice(0, 2).map((incident) => (
                  <IncidentItem key={incident.id} incident={incident} />
                ))
              )}
              <button 
                onClick={onDeclareIncident}
                className="w-full bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Déclarer un incident
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trajets en cours */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Trajets en cours</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Voir tout
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trips.length === 0 ? (
            <div className="text-center py-8 col-span-3">
              <Truck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Aucun trajet planifié</p>
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