// Hero section's visual anchor: a styled terminal window with typing animation.
// 
// Shows static command lines from profile.json, then a typewriter effect cycling
// through profile.json#terminal.roles. The typing hooks into useTypewriter for the
// character-by-character animation. All text comes from data, not hardcoded here.

import PropTypes from 'prop-types';
import GlassCard from './GlassCard';
import { useTypewriter } from '../../hooks/useTypewriter';

function TerminalWindow({ terminal }) {
  const typedRole = useTypewriter(terminal.roles);

  return (
    <GlassCard className="terminal-window" strong aria-label="Terminal preview">
      <div className="terminal-titlebar">
        <span className="terminal-dot terminal-dot--red" />
        <span className="terminal-dot terminal-dot--yellow" />
        <span className="terminal-dot terminal-dot--green" />
        <span className="terminal-title">
          {terminal.user}@{terminal.host} — zsh
        </span>
      </div>

      <div className="terminal-body">
        {terminal.commandLines.map((line, index) => {
          const isCommand = !line.startsWith('→');
          return (
            <div className="terminal-line" key={`${index}-${line.slice(0, 8)}`}>
              {isCommand ? (
                <>
                  <span className="terminal-prompt">$ </span>
                  {line}
                </>
              ) : (
                <span className="terminal-output">{line}</span>
              )}
            </div>
          );
        })}

        <div className="terminal-line">
          <span className="terminal-prompt">$ </span>
          echo $ROLE
          <div className="terminal-output">
            {typedRole}
            <span className="terminal-cursor" aria-hidden="true" />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

TerminalWindow.propTypes = {
  terminal: PropTypes.shape({
    user: PropTypes.string,
    host: PropTypes.string,
    commandLines: PropTypes.arrayOf(PropTypes.string),
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default TerminalWindow;
