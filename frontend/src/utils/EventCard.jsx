import { FaTwitter, FaDiscord  } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const EventCard = ({
  id,
  title,
  subtitle,
  theme,
  participants,
  participantCount,
  mode,
  registration, 
  startDate,
  twitterLink,
  discordLink,
  showInstaIcon = true,
  showDiscordIcon = true,
  className = "",
}) => {
  const navigate = useNavigate();

  const handleTwitterClick = () => {
    window.location.href = twitterLink;
  }

  const handleDiscordClick = () => {
    window.location.href = discordLink;
  }

  const handleApplyClick = () => {
    navigate(`/apply/${id}`);
  }
  return (
    <div
      className={`bg-white rounded-2xl hover:border-2 hover:border-red-500 hover:cursor-pointer p-6 max-w-xl w-full ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold text-red-500 mb-1">{title}</h2>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>

        {/* Action buttons - horizontal on mobile, top-right on desktop */}
        <div className="flex gap-2 sm:flex-row">
          {showInstaIcon && (
            <button
              onClick={handleTwitterClick}
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer transition-colors"
            >
              <FaTwitter className="w-5 h-5 text-gray-600" />
            </button>
          )}
          {showDiscordIcon && (
            <button
              onClick={handleDiscordClick}
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer transition-colors"
            >
              <FaDiscord className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Theme Section */}
      <div className="mb-8">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">THEME</p>
        <span className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
          {theme}
        </span>
      </div>

      {/* Participants Section - Hidden on mobile, shown on desktop */}
      <div className="hidden sm:flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {participants?.slice(0, 3)?.map((participant, index) => (
              <img
                key={participant.id}
                src={participant.avatar || "/placeholder.svg"}
                alt={participant.name}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                style={{ zIndex: 10 - index }}
              />
            ))}
          </div>
        </div>
        <div className="text-emerald-500 font-semibold text-sm">+{participantCount} participating</div>
      </div>

      {/* Status Section - Responsive layout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Status badges - vertical stack on mobile, horizontal on desktop */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <span className="bg-gray-100 text-gray-600 px-3 py-2 rounded-md text-xs font-medium text-center sm:text-left">
            {mode}
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-2 rounded-md text-xs font-medium text-center sm:text-left">
            {registration}
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-2 rounded-md text-xs font-medium text-center sm:text-left">
            {startDate}
          </span>
        </div>
      </div>

      {/* Apply Button - Full width on mobile */}
      <button
        onClick={handleApplyClick}
        className="w-full sm:w-auto bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-6 py-3 sm:py-2 rounded-full font-medium transition-colors sm:ml-auto sm:block"
      >
        Apply now
      </button>
    </div>
  )
}

export default EventCard
