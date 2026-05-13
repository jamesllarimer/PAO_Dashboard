import { useAlert } from "~/context/AlertContext";

export default function AlertToast() {
    const { alerts, dismiss } = useAlert();

    if (alerts.length === 0) return null;

    return (
        <div className="fixed top-14 right-4 z-[200] flex flex-col gap-2 w-80">
            {alerts.map(alert => (
                <div
                    key={alert.id}
                    role="alert"
                    className={`flex items-start gap-3 rounded-md px-4 py-3 shadow-lg border text-sm font-medium transition-all duration-300 ${
                        alert.type === 'success'
                            ? 'bg-[#1a2a1a] border-[#2a4a2a] text-[#6db86d]'
                            : 'bg-[#3a1a1a] border-[#5a2a2a] text-[#e87070]'
                    }`}
                >
                    <span className="mt-0.5 shrink-0 text-base">
                        {alert.type === 'success' ? '✓' : '✕'}
                    </span>
                    <span className="flex-1">{alert.message}</span>
                    <button
                        onClick={() => dismiss(alert.id)}
                        className="ml-2 shrink-0 opacity-60 hover:opacity-100 transition-opacity text-base leading-none"
                        aria-label="Dismiss"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
}
