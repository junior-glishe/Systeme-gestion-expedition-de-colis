import React, { useState } from "react";
import { 
  AlertTriangle, XCircle, Plus, Upload, 
  Calendar, Clock, MapPin, Truck, Package,
  User, Phone, Mail, FileText, AlertCircle,
  CheckCircle, ChevronRight, Info, Image,
  Send, Paperclip, Trash2
} from "lucide-react";

export default function SignalerIncident({ 
  packages = [], 
  onSubmit = () => {},
  onClose = () => {}
}) {
  const [formData, setFormData] = useState({
    expedition: "",
    type: "",
    description: "",
    date: "",
    heure: "",
    lieu: "",
    gravite: "Moyenne",
    impact: "",
    pieces_jointes: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const typesIncident = [
    "Retard de livraison",
    "Colis endommagé",
    "Colis perdu",
    "Problème de véhicule",
    "Accident",
    "Problème client",
    "Autre"
  ];

  const niveauxGravite = [
    { value: "Faible", color: "bg-green-100 text-green-700" },
    { value: "Moyenne", color: "bg-yellow-100 text-yellow-700" },
    { value: "Élevée", color: "bg-orange-100 text-orange-700" },
    { value: "Critique", color: "bg-red-100 text-red-700" }
  ];

  const impacts = [
    "Aucun impact",
    "Retard mineur",
    "Retard important",
    "Interruption de service",
    "Perte financière"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      pieces_jointes: [...prev.pieces_jointes, ...files]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      pieces_jointes: prev.pieces_jointes.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.expedition) newErrors.expedition = "Veuillez sélectionner une expédition";
    if (!formData.type) newErrors.type = "Veuillez sélectionner un type d'incident";
    if (!formData.description || formData.description.length < 10) {
      newErrors.description = "Veuillez décrire l'incident (minimum 10 caractères)";
    }
    if (!formData.date) newErrors.date = "Veuillez sélectionner une date";
    if (!formData.heure) newErrors.heure = "Veuillez sélectionner une heure";
    if (!formData.lieu) newErrors.lieu = "Veuillez indiquer le lieu";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Appeler la fonction onSubmit avec les données
      onSubmit(formData);
      
      // Afficher le succès
      setShowSuccess(true);
      
      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        setFormData({
          expedition: "",
          type: "",
          description: "",
          date: "",
          heure: "",
          lieu: "",
          gravite: "Moyenne",
          impact: "",
          pieces_jointes: []
        });
        setShowSuccess(false);
        setIsSubmitting(false);
      }, 3000);
      
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      setIsSubmitting(false);
    }
  };

  // Composant pour les statistiques rapides
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

  // Type d'incident proposé
  const IncidentTypeCard = ({ type, selected, onClick }) => (
    <button
      type="button"
      onClick={() => onClick(type)}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
        selected === type
          ? "bg-red-50 text-red-600 border-2 border-red-500 shadow-sm"
          : "bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100"
      }`}
    >
      {type}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Signaler un incident</h2>
              <p className="text-gray-500 mt-1">Déclarez un incident lié à une expédition</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <QuickStat 
          label="Total expéditions" 
          value={packages.length} 
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          icon={Package}
        />
        <QuickStat 
          label="En cours" 
          value={packages.filter(p => p.status === "en_cours").length} 
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          icon={Truck}
        />
        <QuickStat 
          label="En attente" 
          value={packages.filter(p => p.status === "en_attente").length} 
          color="bg-gradient-to-br from-yellow-500 to-yellow-600"
          icon={Clock}
        />
        <QuickStat 
          label="Incidents signalés" 
          value="0" 
          color="bg-gradient-to-br from-red-500 to-red-600"
          icon={AlertCircle}
        />
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden">
        {showSuccess ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Incident signalé avec succès !</h3>
            <p className="text-gray-500">Votre incident a été enregistré. Un suivi sera effectué dans les plus brefs délais.</p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Signaler un autre incident
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* Expédition concernée */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Expédition concernée *
                </label>
                <select 
                  name="expedition"
                  value={formData.expedition}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white ${
                    errors.expedition ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                  }`}
                >
                  <option value="">Sélectionner une expédition</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.reference}>
                      {pkg.reference} - {pkg.client} - {pkg.destination}
                    </option>
                  ))}
                </select>
                {errors.expedition && (
                  <p className="text-xs text-red-500 mt-1">{errors.expedition}</p>
                )}
              </div>

              {/* Type d'incident */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Type d'incident *
                </label>
                <div className="flex flex-wrap gap-2">
                  {typesIncident.map((type) => (
                    <IncidentTypeCard
                      key={type}
                      type={type}
                      selected={formData.type}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, type }));
                        if (errors.type) {
                          setErrors(prev => ({ ...prev, type: "" }));
                        }
                      }}
                    />
                  ))}
                </div>
                {errors.type && (
                  <p className="text-xs text-red-500 mt-1">{errors.type}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description détaillée *
                </label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-y ${
                    errors.description ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                  }`}
                  rows="4"
                  placeholder="Décrivez l'incident en détail..."
                />
                {errors.description && (
                  <p className="text-xs text-red-500 mt-1">{errors.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Minimum 10 caractères
                </p>
              </div>

              {/* Date et Heure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Date *
                  </label>
                  <input 
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                      errors.date ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.date && (
                    <p className="text-xs text-red-500 mt-1">{errors.date}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Heure *
                  </label>
                  <input 
                    type="time"
                    name="heure"
                    value={formData.heure}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                      errors.heure ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.heure && (
                    <p className="text-xs text-red-500 mt-1">{errors.heure}</p>
                  )}
                </div>
              </div>

              {/* Lieu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Lieu de l'incident *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text"
                    name="lieu"
                    value={formData.lieu}
                    onChange={handleChange}
                    placeholder="Adresse ou lieu de l'incident"
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                      errors.lieu ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.lieu && (
                  <p className="text-xs text-red-500 mt-1">{errors.lieu}</p>
                )}
              </div>

              {/* Gravité */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Niveau de gravité
                </label>
                <div className="flex flex-wrap gap-3">
                  {niveauxGravite.map((niveau) => (
                    <button
                      key={niveau.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, gravite: niveau.value }))}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        formData.gravite === niveau.value
                          ? `${niveau.color} border-2 border-current shadow-sm`
                          : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      {niveau.value}
                    </button>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Impact sur la livraison
                </label>
                <select 
                  name="impact"
                  value={formData.impact}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="">Sélectionner un impact</option>
                  {impacts.map((impact) => (
                    <option key={impact} value={impact}>
                      {impact}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pièces jointes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Pièces jointes (photos, documents)
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-red-300 transition-all">
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Glissez vos fichiers ici ou <span className="text-red-500 font-medium">parcourez</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, PDF (max 10MB)
                    </p>
                  </label>
                </div>
                
                {/* Liste des fichiers */}
                {formData.pieces_jointes.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {formData.pieces_jointes.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
                        <div className="flex items-center gap-3">
                          <Paperclip className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <span className="text-xs text-gray-400">
                            {(file.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Signaler l'incident
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Informations supplémentaires */}
      <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200/50">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Information importante</p>
            <p className="text-sm text-blue-700 mt-0.5">
              Tous les incidents signalés sont pris en charge par notre équipe dans les plus brefs délais. 
              Vous serez notifié de l'avancement du traitement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}