import React, { useState, useEffect } from 'react';

const PlayerForm = ({ initialData, onSubmit, onCancel }) => {
  const defaultState = {
    name: '',
    jerseyNo: '',
    age: '',
    height: '',
    weight: '',
    nationality: '',
    runsScored: '',
    average: '',
    strikeRate: '',
    wickets: '',
    economy: '',
    skillSet: 'Batsman',
    bowlingType: '',
    battingStyle: 'Right-handed'
  };

  const [formData, setFormData] = useState(defaultState);

  // When initialData changes (e.g. entering edit mode), update the form
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultState);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData(defaultState); // Clear if creating new
    }
  };

  const inputClasses = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all duration-300 placeholder-white/30";
  const radioLabelClasses = "flex items-center justify-center px-4 py-3 border border-white/10 rounded-lg cursor-pointer bg-black/40 text-brand-muted hover:border-white/30 transition-all duration-300 peer-checked:bg-brand-accent/20 peer-checked:border-brand-accent peer-checked:text-white peer-checked:shadow-[0_0_15px_rgba(230,57,70,0.3)]";

  return (
    <div className="bg-brand-card/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-8 md:p-10 relative overflow-hidden">
      <form onSubmit={handleSubmit} className="space-y-8 mt-2">
        <div className="flex justify-between items-end border-b border-white/10 pb-4">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-muted">
            {initialData ? 'Edit Player' : 'Player Profile'}
          </h2>
          {initialData && (
            <button type="button" onClick={onCancel} className="text-sm text-red-400 hover:text-red-300 transition-colors">
              Cancel Edit
            </button>
          )}
        </div>

        {/* Basic Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-brand-muted uppercase tracking-wider font-semibold ml-1">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="e.g. Virat Kohli" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-brand-muted uppercase tracking-wider font-semibold ml-1">Nationality</label>
            <input 
              type="text" 
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="e.g. Indian" 
            />
          </div>
        </div>

        {/* Physical Attributes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-brand-muted uppercase tracking-wider font-semibold ml-1">Jersey No.</label>
            <input 
              type="number" 
              name="jerseyNo"
              value={formData.jerseyNo}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="18" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-brand-muted uppercase tracking-wider font-semibold ml-1">Age</label>
            <input 
              type="number" 
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="e.g. 35" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-brand-muted uppercase tracking-wider font-semibold ml-1">Height (cm)</label>
            <input 
              type="number" 
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="175" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-brand-muted uppercase tracking-wider font-semibold ml-1">Weight (kg)</label>
            <input 
              type="number" 
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="70" 
            />
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-muted mb-6">
            Technical Skills
          </h2>
          
          <div className="space-y-6">
            {/* Skill Set */}
            <div className="space-y-3">
              <label className="text-sm text-brand-muted uppercase tracking-wider font-semibold ml-1 block">Primary Skill</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Batsman', 'Bowler', 'All Rounder'].map((skill) => (
                  <div key={skill}>
                    <input 
                      type="radio" 
                      id={`skill-${skill}`} 
                      name="skillSet" 
                      value={skill}
                      checked={formData.skillSet === skill}
                      onChange={handleChange}
                      className="peer hidden" 
                    />
                    <label htmlFor={`skill-${skill}`} className={radioLabelClasses}>
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Batting Style */}
              <div className="space-y-3">
                <label className="text-sm text-brand-muted uppercase tracking-wider font-semibold ml-1 block">Batting Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Right-handed', 'Left-handed'].map((style) => (
                    <div key={style}>
                      <input 
                        type="radio" 
                        id={`bat-${style}`} 
                        name="battingStyle" 
                        value={style}
                        checked={formData.battingStyle === style}
                        onChange={handleChange}
                        className="peer hidden" 
                      />
                      <label htmlFor={`bat-${style}`} className={radioLabelClasses}>
                        {style}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bowling Type */}
              <div className="space-y-3">
                <label className="text-sm text-brand-muted uppercase tracking-wider font-semibold ml-1 block flex justify-between">
                  <span>Bowling Type</span>
                  {formData.skillSet === 'Batsman' && <span className="text-xs text-white/30 italic font-normal">Optional</span>}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Seamer', 'Spinner'].map((type) => (
                    <div key={type}>
                      <input 
                        type="radio" 
                        id={`bowl-${type}`} 
                        name="bowlingType" 
                        value={type}
                        checked={formData.bowlingType === type}
                        onChange={handleChange}
                        className="peer hidden" 
                      />
                      <label htmlFor={`bowl-${type}`} className={radioLabelClasses}>
                        {type}
                      </label>
                    </div>
                  ))}
                  {formData.bowlingType && formData.skillSet === 'Batsman' && (
                    <div className="col-span-2 mt-1">
                      <button 
                        type="button" 
                        onClick={() => setFormData(p => ({...p, bowlingType: ''}))}
                        className="text-xs text-brand-muted hover:text-white transition-colors"
                      >
                        Clear bowling type
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-muted mb-6">
            Statistics
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-brand-muted uppercase tracking-wider font-semibold ml-1">Runs Scored</label>
              <input 
                type="number" 
                name="runsScored"
                value={formData.runsScored}
                onChange={handleChange}
                required
                className={inputClasses}
                placeholder="e.g. 5000" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-brand-muted uppercase tracking-wider font-semibold ml-1">Average</label>
              <input 
                type="number" step="0.01"
                name="average"
                value={formData.average}
                onChange={handleChange}
                required
                className={inputClasses}
                placeholder="e.g. 45.6" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-brand-muted uppercase tracking-wider font-semibold ml-1">Strike Rate</label>
              <input 
                type="number" step="0.01"
                name="strikeRate"
                value={formData.strikeRate}
                onChange={handleChange}
                required
                className={inputClasses}
                placeholder="e.g. 130.5" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-brand-muted uppercase tracking-wider font-semibold ml-1">Wickets</label>
              <input 
                type="number" 
                name="wickets"
                value={formData.wickets}
                onChange={handleChange}
                required={(formData.skillSet === 'Bowler' || formData.skillSet === 'All Rounder')}
                className={inputClasses}
                placeholder="e.g. 120" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-brand-muted uppercase tracking-wider font-semibold ml-1 flex justify-between">
                <span>Economy</span>
              </label>
              <input 
                type="number" step="0.01"
                name="economy"
                value={formData.economy}
                onChange={handleChange}
                required={(formData.skillSet === 'Bowler' || formData.skillSet === 'All Rounder')}
                className={inputClasses}
                placeholder="e.g. 5.6" 
              />
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button type="submit" className="w-full bg-brand-accent hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(230,57,70,0.4)] hover:shadow-[0_0_25px_rgba(230,57,70,0.6)] active:transform active:scale-95 flex items-center justify-center space-x-2 md:w-auto md:px-12 md:ml-auto">
            <span>{initialData ? 'Update Details' : 'Register Player'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlayerForm;
