{/* Task List */}
        <div>
          {filtered.length === 0 ? (
            <EmptyState filter={activeTab} />
          ) : (
            filtered.map(task => (
              <div key={task.id} className="card-enter">
                <TaskCard task={task} onToggleStatus={handleToggleStatus} onDelete={handleDelete} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
            background: toast.type === "error" ? "#3d1010" : toast.type === "info" ? "#1a1a2e" : "#0f2a1a",
            border: 1px solid ${toast.type === "error" ? "#FF4D4D40" : toast.type === "info" ? "#ffffff20" : "#4CAF7D40"},
            color: toast.type === "error" ? "#FF4D4D" : toast.type === "info" ? "#aaa" : "#4CAF7D",
            padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 500,
            animation: "slideIn 0.25s ease", zIndex: 9999, whiteSpace: "nowrap",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {toast.msg}
        </div>
      )}

      <style>{
        @keyframes spin { to { transform: rotate(360deg); } }
      }</style>
    </div>
  );
}
