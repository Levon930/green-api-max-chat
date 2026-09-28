import {
  describeSettingsProblem,
  RECEIVING_SETTINGS,
  useGetSettingsQuery,
  useSetSettingsMutation,
} from '@/entities/instance'

interface SettingsNoticeProps {
  pollingInterval: number
}

export const SettingsNotice = ({ pollingInterval }: SettingsNoticeProps) => {
  const { data: settings } = useGetSettingsQuery(undefined, { pollingInterval })
  const [enableReceiving, { isLoading, isSuccess, isError, reset }] = useSetSettingsMutation()
  const problem = describeSettingsProblem(settings)

  if (isSuccess) {
    return (
      <div className="banner banner--action" role="status">
        <p>Настройки сохранены: инстанс перезапустится, они применятся в течение 5 минут.</p>
        <button type="button" className="button banner__button" onClick={reset}>
          Понятно
        </button>
      </div>
    )
  }

  if (!problem) return null

  return (
    <div className="banner banner--action" role="status">
      <p>
        {problem}.{settings?.webhookUrl && ' Кнопка ниже очистит webhookUrl, и интеграция по этому адресу перестанет получать уведомления.'}
        {isError && ' Не удалось сохранить настройки, попробуйте ещё раз.'}
      </p>
      <button
        type="button"
        className="button banner__button"
        disabled={isLoading}
        onClick={() => enableReceiving(RECEIVING_SETTINGS)}
      >
        {isLoading ? 'Сохраняем…' : 'Включить уведомления'}
      </button>
    </div>
  )
}
