import React from 'react';

const PlayerList = ({ players, onEdit, onDelete }) => {
  if (players.length === 0) {
    return (
      <div className="bg-brand-card/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-8 md:p-16 text-center text-brand-muted">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p className="text-xl font-semibold mb-2 text-white">No players registered yet</p>
        <p>Add some players using the "Add Player" form.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 text-white">
        {players.map((player) => (
          <div key={player.id} className="bg-brand-card/60 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-5 relative group hover:border-white/20 transition-all duration-300">
            
            {/* Context Actions */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onEdit(player)}
                className="bg-black/50 hover:bg-brand-accent p-2 rounded-lg text-brand-muted hover:text-white transition-all"
                title="Edit Player"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button 
                onClick={() => {
                  if(window.confirm('Are you sure you want to delete this player?')) {
                    onDelete(player.id);
                  }
                }}
                className="bg-black/50 hover:bg-red-600 p-2 rounded-lg text-brand-muted hover:text-white transition-all"
                title="Delete Player"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
              {/* Avatar / Number Area */}
              <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-brand-accent/20 to-brand-accent/5 font-bold text-xl border border-brand-accent/30 text-brand-accent mb-4 sm:mb-0">
                {player.jerseyNo}
              </div>
              
              {/* Info Grid */}
              <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-x-8 sm:gap-y-2">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold">{player.name} <span className="text-sm font-normal text-brand-muted">({player.age} yrs)</span></h3>
                  <p className="text-sm text-brand-muted">{player.nationality} • {player.skillSet}</p>
                </div>
                
                <div className="text-sm">
                  <p className="text-brand-muted uppercase text-xs tracking-wider">Batting</p>
                  <p className="font-semibold">{player.battingStyle}</p>
                </div>

                <div className="text-sm">
                  <p className="text-brand-muted uppercase text-xs tracking-wider">Bowling</p>
                  <p className="font-semibold">{player.bowlingType || 'N/A'}</p>
                </div>

                {/* Stats Row */}
                <div className="text-sm border-t border-white/5 pt-2 sm:border-t-0 sm:pt-0">
                  <p className="text-brand-muted uppercase text-xs tracking-wider">Runs</p>
                  <p className="font-semibold">{player.runsScored} <span className="text-xs text-brand-muted ml-1 font-normal">({player.average})</span></p>
                </div>

                <div className="text-sm border-t border-white/5 pt-2 sm:border-t-0 sm:pt-0">
                  <p className="text-brand-muted uppercase text-xs tracking-wider">SR</p>
                  <p className="font-semibold">{player.strikeRate}</p>
                </div>

                <div className="text-sm border-t border-white/5 pt-2 sm:border-t-0 sm:pt-0">
                  <p className="text-brand-muted uppercase text-xs tracking-wider">Wickets</p>
                  <p className="font-semibold">{player.wickets || '0'}</p>
                </div>

                <div className="text-sm border-t border-white/5 pt-2 sm:border-t-0 sm:pt-0">
                  <p className="text-brand-muted uppercase text-xs tracking-wider">Economy</p>
                  <p className="font-semibold">{player.economy || '0.00'}</p>
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
