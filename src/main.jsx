import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MapPin, CalendarDays, Heart, Volume2, VolumeX, ArrowDown, Clock, Sparkles, Menu } from 'lucide-react';
import './style.css';

const wedding = {
  bride: 'Naz',
  groom: 'Sohil Ali',
  date: '2026-11-21T19:30:00+05:30',
  venue: 'Clarks Inn Suites, Taj Nagri Phase 2',
  dateLabel: '21 November 2026',
  address: 'Clarks Inn Suites, Taj Nagri Phase 2, Agra, Uttar Pradesh, India',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Clarks+Inn+Suites+Taj+Nagri+Phase+2+Agra',
  rsvpNumber: '919876543210'
};

function App() {
  const [remaining, setRemaining] = useState({});
  const [musicOn, setMusicOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, new Date(wedding.date).getTime() - Date.now());
      setRemaining({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const rsvp = () => {
    const message = encodeURIComponent(`Hello! I'd like to RSVP for ${wedding.bride} & ${wedding.groom}'s wedding on ${wedding.dateLabel}.`);
    window.open(`https://wa.me/${wedding.rsvpNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const addCalendar = () => {
    const start = new Date(wedding.date);
    const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
    const fmt = d => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Luxe Wedding Invite//EN\nBEGIN:VEVENT\nUID:luxe-wedding-invite@example.com\nDTSTAMP:${fmt(new Date())}\nDTSTART:${fmt(start)}\nDTEND:${fmt(end)}\nSUMMARY:${wedding.bride} & ${wedding.groom} — Wedding Celebration\nLOCATION:${wedding.venue}, ${wedding.address}\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'wedding-invitation.ics'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#home">THE WEDDING EDIT<span>AN INVITATION TO REMEMBER</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Menu size={20}/></button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#story" onClick={() => setMenuOpen(false)}>OUR STORY</a>
          <a href="#events" onClick={() => setMenuOpen(false)}>THE CELEBRATION</a>
          <a href="#venue" onClick={() => setMenuOpen(false)}>VENUE</a>
        </div>
        <button className="sound-btn" onClick={() => setMusicOn(!musicOn)} title="Music toggle demo">
          {musicOn ? <Volume2 size={16}/> : <VolumeX size={16}/>} <span>{musicOn ? 'SOUND ON' : 'SOUND OFF'}</span>
        </button>
      </nav>

      <section className="hero" id="home">
        <div className="hero-image"></div>
        <div className="hero-shade"></div>
        <div className="hero-content">
          <p className="eyebrow light"><span></span> TOGETHER WITH THEIR FAMILIES <span></span></p>
          <p className="invite-line">joyfully invite you to celebrate their wedding</p>
          <h1>{wedding.bride}<i>&</i>{wedding.groom}</h1>
          <div className="gold-rule"><span>✦</span></div>
          <p className="hero-date">{wedding.dateLabel.toUpperCase()}</p>
          <a href="#invitation" className="round-link" aria-label="Scroll to invitation"><ArrowDown size={18}/></a>
        </div>
        <div className="hero-caption">A NEW CHAPTER · A FOREVER PROMISE</div>
      </section>

      <section className="invitation section-pad" id="invitation">
        <p className="eyebrow"><span></span> SAVE THE DATE <span></span></p>
        <h2>Two hearts. <em>One beautiful</em> beginning.</h2>
        <p className="body-copy">With the love of our families and the blessings of those we hold dear, we invite you to join us as we begin our forever.</p>
        <div className="date-lockup"><CalendarDays size={18}/><span>{wedding.dateLabel}</span><i>·</i><span>New Agrai</span></div>
        <div className="countdown">
          {['days','hours','minutes','seconds'].map(key => <div className="count-unit" key={key}><strong>{String(remaining[key] ?? '00').padStart(2,'0')}</strong><span>{key.toUpperCase()}</span></div>)}
        </div>
      </section>

      <section className="story section-pad" id="story">
        <div className="story-photo"></div>
        <div className="story-copy">
          <p className="eyebrow">A LITTLE ABOUT US</p>
          <h2>It was always<br/><em>you.</em></h2>
          <div className="short-rule"></div>
          <p className="body-copy">Some stories are written in the stars. Ours began with a hello, grew with a thousand little moments, and led us to the easiest yes of our lives.</p>
          <p className="signature">With love, {wedding.bride} & {wedding.groom}</p>
        </div>
      </section>

      <section className="events section-pad" id="events">
        <p className="eyebrow"><span></span> THE WEDDING FESTIVITIES <span></span></p>
        <h2>Celebrate <em>with us</em></h2>
        <p className="body-copy">A few beautiful moments, shared with our favourite people.</p>
      
<div className="event-grid">
  <article className="event-card">
    <div className="event-number">01</div>
    <Sparkles size={22} strokeWidth={1.2} />
    <h3>Sangeet</h3>
    <p>An evening of music, dance & celebration</p>
    <div className="event-meta"><CalendarDays size={14} /> 18 October 2026</div>
    <div className="event-meta"><Clock size={14} /> 7:30 PM</div>
    <div className="event-meta"><MapPin size={14} /> Banquet Riya Palace, Agra</div>
    <a className="event-map-link" href="https://www.google.com/maps/search/?api=1&query=Banquet+Riya+Palace+Agra" target="_blank" rel="noreferrer">GET DIRECTIONS ↗</a>
  </article>

  <article className="event-card">
    <div className="event-number">02</div>
    <Sparkles size={22} strokeWidth={1.2} />
    <h3>Haldi</h3>
    <p>Sunshine, marigolds & family traditions</p>
    <div className="event-meta"><CalendarDays size={14} /> 20 October 2026</div>
    <div className="event-meta"><Clock size={14} /> 11:00 AM</div>
    <div className="event-meta"><MapPin size={14} /> The Green Valley, Agra</div>
    <a className="event-map-link" href="https://www.google.com/maps/search/?api=1&query=The+Green+Valley+Agra" target="_blank" rel="noreferrer">GET DIRECTIONS ↗</a>
  </article>

  <article className="event-card">
    <div className="event-number">03</div>
    <Heart size={22} strokeWidth={1.2} />
    <h3>Reception</h3>
    <p>An evening of joy & togetherness</p>
    <div className="event-meta"><CalendarDays size={14} /> 23 October 2026</div>
    <div className="event-meta"><Clock size={14} /> 7:00 PM</div>
    <div className="event-meta"><MapPin size={14} /> The Palm Court, Agra</div>
    <a className="event-map-link" href="https://www.google.com/maps/search/?api=1&query=The+Palm+Court+Agra" target="_blank" rel="noreferrer">GET DIRECTIONS ↗</a>
  </article>

  <article className="event-card">
    <div className="event-number">04</div>
    <Sparkles size={22} strokeWidth={1.2} />
    <h3>Mehendi</h3>
    <p>Intricate henna & beautiful memories</p>
    <div className="event-meta"><CalendarDays size={14} /> 20 November 2026</div>
    <div className="event-meta"><Clock size={14} /> 8:00 PM</div>
    <div className="event-meta"><MapPin size={14} /> THE RAMANA GRAND, Agra</div>
    <a className="event-map-link" href="https://www.google.com/maps/search/?api=1&query=THE+RAMANA+GRAND+Agra" target="_blank" rel="noreferrer">GET DIRECTIONS ↗</a>
  </article>

  <article className="event-card featured">
    <div className="event-number">05</div>
    <Heart size={22} strokeWidth={1.2} />
    <h3>The Wedding</h3>
    <p>The beginning of our forever</p>
    <div className="event-meta"><CalendarDays size={14} /> 21 November 2026</div>
    <div className="event-meta"><Clock size={14} /> 7:30 PM onwards</div>
    <div className="event-meta"><MapPin size={14} /> Clarks Inn Suites, Taj Nagri Phase 2, Agra</div>
    <a className="event-map-link" href="https://www.google.com/maps/search/?api=1&query=Clarks+Inn+Suites+Taj+Nagri+Phase+2+Agra" target="_blank" rel="noreferrer">GET DIRECTIONS ↗</a>
  </article>
</div>

      </section>

      <section className="rsvp section-pad">
        <p className="eyebrow"><span></span> YOUR PRESENCE IS OUR PRESENT <span></span></p>
        <h2>We can't wait to<br/><em>celebrate with you.</em></h2>
        <p className="body-copy">Kindly let us know if you'll be joining us.</p>
        <button className="button button-dark" onClick={rsvp}>KINDLY RSVP ON WHATSAPP <span>↗</span></button>
        <p className="small-note">With love and gratitude,</p>
        <p className="closing-names">{wedding.bride} & {wedding.groom}</p>
      </section>

      <footer className="footer">
        <div className="footer-mark">A <span>&</span> A</div>
        <p>MADE WITH LOVE · {wedding.dateLabel.toUpperCase()}</p>
        <p className="footer-credit">A DIGITAL INVITATION</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
