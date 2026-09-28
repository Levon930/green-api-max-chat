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
  const [enableReceiving, { isLoading, isSuccess, isError }] = useSetSettingsMutation()
  const problem = describeSettingsProblem(settings)
  if (!problem) return null

  return (
    <div className="banner banner--action" role="status">
      <p>
        {problem}. Входящие сообщения не будут приходить в чат.
        {isSuccess && ' Настройки сохранены: инстанс перезапустится, они применятся в течение 5 минут.'}
        {isError && ' Не удалось сохранить настройки, попробуйте ещё раз.'}
      </p>
      <button
        type="button"
        className="button banner__button"
        disabled={isLoading || isSuccess}
        onClick={() => enableReceiving(RECEIVING_SETTINGS)}
      >
        {isLoading ? 'Сохраняем…' : 'Включить приём сообщений'}
      </button>
    </div>
  )
}
