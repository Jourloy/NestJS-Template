export class EnvConfig {
	private envs = ["NODE_ENV", "SESSION_SECRET", "PORT"];

	/**
	 * Проверяет env переменные и возвращает массив с отсутствующими
	 */
	public check(): string[] {
		const empty: string[] = [];

		this.envs.forEach(key => {
			if (process.env[key] == null) {
				empty.push(key);
			}
		});

		return empty;
	}

	/**
	 * Проверяет env переменные и возвращает boolean
	 */
	public checkAndBool(): boolean {
		const empty = this.check();

		return !!(empty.length > 0);
	}

	/**
	 * Проверяет env переменные и выбрасывает ошибку, если каких-то нет
	 */
	public checkAndThrow(): void {
		const empty = this.check();

		if (empty.length > 0) {
			throw new Error(`Неоьходимо указать следующие ENV переменные: ${empty.join(", ")}`);
		}
	}
}
